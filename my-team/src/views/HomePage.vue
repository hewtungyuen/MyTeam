<template>
<div>
<Sidebar/>
<h1 id = 'welcome'> Welcome, {{name}} </h1>
<!-- {{this.tasks}} -->
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

        <div >
            <n-divider />

            <div v-if = "this.projectIds.length === 0">
                <h2>You have no projects at the moment.</h2>
            </div>
            <n-collapse v-else v-for = 'index in this.projectIds.length - 1' :key = 'index'>

                <n-collapse-item :title = "projectNames[index-1]">
                    {{this.tasks}}
                    <ProjectsTable :tasksToDisplay = "this.tasks[index-1]" />
                    <template #header-extra>
                        <button @click = 'goToProjectsPage(this.projectIds[index])'>Go to project</button>
                        <!-- Deadline: {{projectDeadlines[index-1]}} -->
                    </template>
                </n-collapse-item>
                <n-divider />
            </n-collapse>
        </div>
    </n-gi> 


    <!-- 2nd column -->
    <n-gi>

        <div >
            <div>
                <h2 class = 'container' >Deadlines</h2>
                <n-layout class = 'meetingsAndDeadlines' >
                    <div v-for= 'task in this.tasks' :key = 'task'>
                        <n-layout-sider :native-scrollbar="true" bordered v-for = 'subTask in task' :key = 'subTask'> 
                            <!-- <div v-for = 'subTask in task' :key = 'subTask.TaskName'> -->
                            <DeadlinesAndMeetings :title = "subTask.TaskName" :deadline = "subTask.DeadLine" type = "Deadline"/>
                            <!-- </div> -->
                        </n-layout-sider>
                    </div>
                </n-layout>
            </div>
            <br>
            <div>

                <h2 class = 'container'>Meetings</h2>   

                <n-layout class = 'meetingsAndDeadlines' id = 'deadlines'>

                    <n-layout-sider :native-scrollbar="false" bordered v-for = 'meeting in meetings' :key = 'meeting.title'>
                        <DeadlinesAndMeetings :title = "meeting.title" :deadline = "meeting.deadline" type = "Meeting" />
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
import { collection, getDocs, getFirestore} from 'firebase/firestore'
var db = getFirestore(firebaseApp)

export default {

    mounted() {
        console.log('mounted')
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })

        var allUsers = getDocs(collection(db, 'Users'))
        var allProjects = getDocs(collection(db,'Projects'))
        var allTasks = getDocs(collection(db,'Tasks'))

        allUsers.then((querySnapshot) => {
            var myProjects = []
            
            querySnapshot.forEach((doc) => {
                var docData = doc.data()
                if (docData.Email == this.user.email) {
                    this.name = docData.FullName
                    myProjects = myProjects.concat(docData.Projects)
                    myProjects = myProjects.concat(docData.LeadingProjects)
                }
            })
            this.projectIds = myProjects

            this.projectIds.forEach((projId) => {
                
                allProjects.then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.id == projId) {
                            var projData = doc.data()
                            this.projectNames.push(projData.Name)
                            this.projectDeadlines.push(projData.StartDate)

                            var intermediate = []
                            projData.Tasks.forEach((taskId) => {
                                allTasks.then((querySnapshot) => {
                                    querySnapshot.forEach((doc) => {
                                        if (doc.id == taskId) {
                                            if (doc.data().InCharge == this.user.email) {
                                                intermediate.push(doc.data())
                                            }
                                        }
                                    })
                                })
                            })
                            this.tasks.push(intermediate)
                        }
                    })

                })
            })
            // var myTasks = []
            // this.tasks = myTasks
            // console.log(this.tasks)
        })
        


        // allUsers.then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {

        //         let docData = doc.data()

        //         if (docData.Email == 'marvin.leow999@gmail.com') {
        //             this.projectIds = docData.Projects
        //             this.name = docData.FullName

        //             var myTasks = []
        //             // for each project ID that the user has,
        //             this.projectIds.forEach((projId) => {
        //                 // console.log(projId)
        //                 // extract all projects from database
        //                 allProjects.then((allProj) => {
        //                     // for each project in the database,
        //                     allProj.forEach((d) => {
        //                         // if the project matches with the user's project
        //                         if (projId == d.id) {
        //                             // obtain project data and update 
        //                             var projectData = d.data()
        //                             // this.taskIds.push(projectData.Tasks)
        //                             this.projectNames.push(projectData.Name)
        //                             this.projectDeadlines.push(projectData.StartDate)
        //                             // console.log(this.taskIds)
        //                             // for each taskId that the user has,
        //                             projectData.Tasks.forEach((t) => {
        //                                 // console.log(t)
        //                                 // for all the tasks in the databse, 
        //                                 allTasks.then((allTask) => {
        //                                     allTask.forEach((task) => {
        //                                         // if the database task match the project task, 
        //                                         if (task.id == t) {
        //                                             var taskData = task.data()
        //                                             myTasks.push(taskData)
        //                                             // console.log('taskdata')
        //                                             // console.log(taskData)
        //                                             // console.log(this.tasks)
        //                                             // console.log(type(this.tasks))
        //                                         }
        //                                     })
        //                                 })
        //                             })
        //                         }
        //                     })
        //                 })
        //                 // console.log(myTasks)
        //             })
        //             // console.log(myTasks)
        //         }
        //         // this.tasks.push(myTasks)
        //     })
        // })
        // console.log(this.tasks)
        // console.log(typeof(this.tasks))
    },
    data(){
        return {
            name: '',
            user: false,
            projectIds: [],
            projectNames: [],
            projectDeadlines: [],
            tasks: [],
            meetings: [
                {title: 'Meeting 1', deadline: '2022/02/04'},
                {title: 'Meeting 2', deadline: '2022/03/04'},
                {title: 'Meeting 3', deadline: '2022/04/04'},
                {title: 'Meeting 4', deadline: '2022/04/04'},
                {title: 'Meeting 5', deadline: '2022/04/04'},
            ],
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
        goToProjectsPage(projectIds) {
            this.$store.commit('update', projectIds);
            console.log('here')
            console.log(projectIds)
            // console.log(projectIds)
            this.$router.push('/ProjectPage')
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