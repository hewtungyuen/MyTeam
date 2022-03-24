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

        <div >
            <n-divider />
            <n-collapse v-for = 'index in 2' :key = 'index'>
                <n-collapse-item :title = "projectNames[index-1]">
                    <ProjectsTable/>
                    <template #header-extra>
                        <button @click = 'goToProjectsPage(this.projectIds[index-1])'>Go to project</button>
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

                    <n-layout-sider :native-scrollbar="true" bordered v-for = 'task in tasks' :key = 'task.title'> 
                        <DeadlinesAndMeetings :title = "task.title" :deadline = "task.deadline" type = "Task" />
                    </n-layout-sider>

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
    data(){
        return {
            name: '',
            user: false,
            // projects: [
            //     {projectName: 'Project 1', projectDeadline: '2022/04/01'},
            //     {projectName: 'Project 2', projectDeadline: '2022/04/02'},
            //     {projectName: 'Project 3', projectDeadline: '2022/04/03'},
            // ],
            projectIds: null,
            projectNames: [],
            projectDeadlines: [],
            tasks: [
                {title: 'Task 1', deadline: '2022/02/04'},
                {title: 'Task 2', deadline: '2022/03/04'},
                {title: 'Task 3', deadline: '2022/04/04'},
                {title: 'Task 4', deadline: '2022/04/04'},
                {title: 'Task 5', deadline: '2022/04/04'},

            ],
            meetings: [
                {title: 'Meeting 1', deadline: '2022/02/04'},
                {title: 'Meeting 2', deadline: '2022/03/04'},
                {title: 'Meeting 3', deadline: '2022/04/04'},
                {title: 'Meeting 4', deadline: '2022/04/04'},
                {title: 'Meeting 5', deadline: '2022/04/04'},

            ],
        }
    },
    mounted() {
    
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })


        let allUsers = getDocs(collection(db, 'Users'))
        let allProjects = getDocs(collection(db,'Projects'))
        // console.log(allUsers)
        

        allUsers.then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                let docData = doc.data()

                if (docData.Email == 'marvin.leow999@gmail.com') {
                    this.projectIds = docData.Projects
                    this.name = docData.FullName

                    this.projectIds.forEach((x) => {
                        allProjects.then((q) => {
                            q.forEach((d) => {
                                if (x == d.id) {
                                    var projectData = d.data()
                                    this.projectNames.push(projectData.Name)
                                    // console.log(projectData.Name)
                                    this.projectDeadlines.push(projectData.StartDate)
                                }
                            })
                        })
                    })
                }
            })
        })


        // allUsers.forEach((docs) => {
        //     let data = docs.data()

        //     if (data.Email == 'marvin.leow999@gmail.com'){
        //         var allProjects = data.Projects
        //         this.projects = allProjects
        //     }
        // })


    },
    name: 'HomePage',
    components:{
        DeadlinesAndMeetings,
        ProjectsTable,
        Sidebar,
    },
    methods:{
        addNewProject(){
            alert('Add a new project');
            this.$router.push('/NewProjPage');
        },
        // update() {
        //     this.$store.commit('update', "387UsydZXmACIAU9WQMk");
        //     // console.log(this.$store.state.projectID);
        //     // console.log(this.$store.state.name);
        // },
        goToProjectsPage(projectIds) {
            this.$store.commit('update', projectIds);
            console.log(projectIds)
            this.$router.push('/ProjectPage')
        }
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