<template>
<div>
<Sidebar/>
<h1 id = 'welcome'> Welcome, {{name}} </h1>
<n-grid :cols = '2'>

    <!-- 1st column -->

    <n-gi id = 'projects'>

        <!-- Title and button  -->
        <n-grid :cols = "2" id = 'titleAndButton'>
            <n-gi>
                <h2 id = 'myTasksTitle'>My Projects</h2>
            </n-gi>
            <n-gi>
                <n-button id = 'addProjectButton' strong secondary round @click = 'addNewProject()'>
                    Create a new project +
                </n-button>
            </n-gi>
        </n-grid>
        <!-- end  -->

        <br>
        <!-- {{this.projectIds}} -->
        <div >
            <n-divider />
            <div v-if = "this.projectNames.length === 0">
                <h2>You have no projects at the moment.</h2>
            </div>
            <n-collapse v-else-if='this.projectNames.length === 1'>

                <n-collapse-item :title = "projectNames[0]">

                    <div v-if = 'this.myCurrentTasks[index-1].length == 0'>
                        <i>You have no pending tasks at the moment. </i>
                    </div>

                    <div v-else>
                    <ProjectsTable :tasksToDisplay = "this.myCurrentTasks[0]" />
                    </div>

                    <template #header-extra>
                        <button @click = 'goToProjectsPage(this.projectIdsWithoutCompleted[0])'>Go to project</button>
                    </template>
                </n-collapse-item><n-divider />

            </n-collapse>

            <n-collapse v-else v-for = 'index in this.projectNames.length' :key = 'index'>
                <n-collapse-item :title = "projectNames[index-1]">
                    
                    <div v-if = 'this.myCurrentTasks[index-1].length == 0'>
                        <i>You have no pending tasks at the moment. </i>

                    </div>

                    <div v-else>
                        <ProjectsTable :tasksToDisplay = "this.myCurrentTasks[index-1]" :empty = "this.myCurrentTasks.length == 0"/>
                    </div>
                    <template #header-extra>
                        <button @click = 'goToProjectsPage(this.projectIdsWithoutCompleted[index-1])'>Go to project</button>
                    </template>
                </n-collapse-item><n-divider />

            </n-collapse>
            
        </div>
    </n-gi> 


    <!-- 2nd column -->
    <n-gi>

        <div >
            <div>
                
                <h2 class = 'container' >My tasks</h2>
                <n-layout class = 'meetingsAndDeadlines' >
                    <div v-if = 'allMyTasks.length == 0'> <i>You have no upcoming tasks.</i></div>
                    <n-layout-sider :native-scrollbar="true" v-else bordered v-for = 'subTask in allMyTasks' :key = 'subTask.ProjectID'> 
                        <DeadlinesAndMeetings :title = "subTask.TaskName" :date = "subTask.DeadLine" type = "Deadline" :projectId = "subTask.ProjectID"/>
                    </n-layout-sider>
                </n-layout>
            </div>
            <br>
            <div>
                <h2 class = 'container'>Upcoming meetings</h2>   
                <n-layout class = 'meetingsAndDeadlines' id = 'deadlines'>
                    <div v-if = 'allMyMeetingDetails.length == 0'> <i>You have no upcoming meetings.</i></div>
                    <n-layout-sider :native-scrollbar="false" bordered v-else v-for = 'meeting in allMyMeetingDetails' :key = 'meeting.title'>
                        <DeadlinesAndMeetings :title = "meeting.Name" :date = "new Date(meeting.DateTime)" type = "Meeting" :projectId = 'meeting.ProjectID' />
                    </n-layout-sider>

                </n-layout>
            </div>
        </div>
    </n-gi>
</n-grid>
</div>
</template>

<script>

import DeadlinesAndMeetings from '@/components/DeadlinesAndMeetings.vue'
import ProjectsTable from '@/components/ProjectsTable.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from '../firebase.js'
import { collection, getDocs, getFirestore, updateDoc, doc} from 'firebase/firestore'
var db = getFirestore(firebaseApp)

export default {

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })

        var allUsers = getDocs(collection(db, 'Users'))
        var allProjects = getDocs(collection(db,'Projects'))
        var allTasks = getDocs(collection(db,'Tasks'))
        var allMeetings = getDocs(collection(db, 'Meetings'))

        allUsers.then((querySnapshot) => {
            var myProjects = []
            
            querySnapshot.forEach((d) => {
                var docData = d.data()
                if (docData.Email == this.user.email) {
                    this.name = docData.FullName
                    if (docData.Projects) {
                        myProjects = myProjects.concat(docData.Projects)
                    }

                    if (docData.LeadingProjects) {
                        myProjects = myProjects.concat(docData.LeadingProjects)
                    }

                    if (docData.OngoingMeetings){

                        allMeetings.then((querySnapshot) => {
                            querySnapshot.forEach((meetingDoc) => {
                                var meetingData = meetingDoc.data()
                                var ProjectID = meetingData.ProjectID

                                allProjects.then((querySnapshot) => {
                                    querySnapshot.forEach((d) => {

                                        if (d.id == ProjectID && d.data().CompletionStatus == 'In Progress') {
                                            let year = meetingData.DateTime.slice(0,4)
                                            let month = meetingData.DateTime.slice(5,7)
                                            let day = meetingData.DateTime.slice(8,10)
                                            let hour = meetingData.DateTime.slice(12,14)
                                            let minute = meetingData.DateTime.slice(15,17)

                                            let DateTime = new Date(year, month - 1, day, hour, minute)
                                            
                                            if (DateTime >= new Date() && meetingData.Status != 'Cancelled') {
                                                let Name = meetingData.Name
                                                let obj = {DateTime: DateTime, ProjectID: ProjectID, Name: Name}
                                                this.allMyMeetingDetails.push(obj)
                                            } else if (DateTime <= new Date && meetingData.Status == 'Upcoming'){
                                                updateDoc(doc(db,'Meetings', meetingDoc.id), {Status:'Completed'})
                                            }
                                        } 
                                    })
                                    this.allMyMeetingDetails.sort((a,b) => (a.DateTime > b.DateTime) ? 1 : ((b.DateTime > a.DateTime) ? -1 : 0))

                                })

                            })

                        })

                    }
                }
            })

            this.projectIds = myProjects

            this.projectIds.forEach((projId) => {    
                
                allProjects.then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.id == projId) {
                            var projData = doc.data()
                            if (projData.CompletionStatus == 'In Progress') {
                                this.projectIdsWithoutCompleted.push(doc.id)
                                this.projectNames.push(projData.Name)
                                this.projectDeadlines.push(projData.StartDate)

                                var intermediate = new Array()
                                projData.Tasks.forEach((taskId) => {
                                    allTasks.then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            if (doc.id == taskId) {
                                                if (doc.data().InCharge == this.user.email && doc.data().CompletionStatus == 'In Progress') {

                                                    let taskData = doc.data()
                                                    let TaskName = taskData.TaskName
                                                    let DeadLine = new Date(taskData.DeadLine)
                                                    let DeadLineString = new Date(taskData.DeadLine).toDateString()
                                                    let ProjectID = taskData.ProjectID
                                                    let ProgressStatus = taskData.ProgressStatus
                                                    let obj = {TaskName:TaskName, DeadLine:DeadLine, ProjectID:ProjectID, ProgressStatus:ProgressStatus,DeadLineString:DeadLineString}

                                                    intermediate.push(obj)
                                                    this.allMyTasks.push(obj)
                                                }
                                            }
                                        })
                                        this.allMyTasks.sort((a,b) => (a.DeadLine > b.DeadLine) ? 1 : ((b.DeadLine > a.DeadLine) ? -1 : 0))
                                    })
                                })
                                this.myCurrentTasks.push(intermediate)
                            }

                        }
                    })

                })
            })

        })

    },
    data(){
        return {
            name: '',
            user: false,
            projectIds: [],
            projectIdsWithoutCompleted:[],
            projectNames: [],
            projectDeadlines: [],
            myCurrentTasks: [], // 2d array, separated by project 
            allMyTasks:[], // 1d array
            allMyMeetingDetails: [],  // objects of meeting details
            allMyMeetings:[] // ids
        }
    },
    name: 'HomePage',
    components:{
        DeadlinesAndMeetings,
        ProjectsTable,
        Sidebar,
    },
    methods:{
        addNewProject(){
            this.$router.push('/NewProjPage');
        },
        // update() {
        //     this.$store.commit('update', "387UsydZXmACIAU9WQMk");
        //     // console.log(this.$store.state.projectID);
        //     // console.log(this.$store.state.name);
        // },
        goToProjectsPage(projectId) {
            this.$store.commit('update', projectId);
            console.log('here')
            console.log(projectId)
            this.$router.push('/ProjectPage/' + projectId);
        },
        sortByDate(){
            this.allMyTasks.sort((a,b) => (a.ExpectedHours > b.ExpectedHours) ? -1 : ((b.ExpectedHours > a.ExpectedHours) ? 1 : 0))

            console.log(this.allMyTasks)
        },
    },
    setup() {
        return {sidebarWidth}
    },
}
</script>

<style scoped>
    .n-layout {
        height: 400px;
        width: 300px;
    }

    #projects{
        margin-left: 30px;
    }

    .meetingsAndDeadlines{
        left: 35%;
        position: relative;
    }

    #addProjectButton{
        top: 30px;
        float:right;
    }

    #welcome{
        margin-left: 30px
    }

    .container {
        left: 35%;
        position: relative;
    }
</style>