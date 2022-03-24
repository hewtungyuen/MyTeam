<template>
<div>
<Sidebar/>
<h1 id = 'welcome'> Not logged in </h1>
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
            <n-collapse v-for = 'project in projects' :key = 'project.projectName'>
                <n-collapse-item :title = "project.projectName">
                    <ProjectsTable/>
                    <template #header-extra>
                        Deadline: {{project.projectDeadline}}
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
import { collection, getDocs, getFirestore } from 'firebase/firestore'

var db = getFirestore(firebaseApp)

import { createStore } from 'vuex'
const store = createStore({
  state () {
    return {
      count: 0
    }
  }
})

console.log(store.state.count)
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
            projects: [],
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

        // async function getAllProjectIds(){
        //     let allUsers = await getDocs(collection(db, 'Users'))
        //     var self = this
        //     allUsers.forEach((docs) => {
        //         let data = docs.data()

        //         if (data.Email == 'marvin.leow999@gmail.com'){
        //             var allProjects = data.Projects

        //             self.projects = allProjects
        //         }
        //     })
        //     return
        // }

        let allProjects = getDocs(collection(db, 'Users'))
        allProjects.then((response) => {
            console.log(response.value)
            response.data.forEach((docs) => {
                let data = docs.data()
                if (data.Email =='marvin.leow999@gmail.com') {
                    console.log(data.Projects)
                    this.projects = data.Projects
                }
            })
        })

        

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

    },
    setup() {
        return {sidebarWidth}
    }
}
</script>

<style scoped>
    .n-layout {
        height: 400px;
        width: 300px;
    }
    /* .n-collapse-item {
        font-weight: bold;
    } */
    #projects{
        margin-left: 30px;
    }

    .container {
        left: 35%;
        position: relative;
    }

    .meetingsAndDeadlines{
        left: 35%;
        width: 300px;
        position: relative;
    }

    #addProjectButton{
        top: 30px;
        float:right;
    }

    #welcome{
        margin-left: 30px
    }

</style>