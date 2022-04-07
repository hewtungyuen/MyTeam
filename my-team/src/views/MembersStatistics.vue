<template >
<div>
    <Header :title="title" />
<div class='template'>
    <Sidebar/>

    <h2> Statistics for: {{this.projectName}} </h2>

    <n-button @click = 'backToProjectPage()'> Back to Project Page</n-button>
    <br><br>

    <div v-if = '!this.allProjects'> No tasks have been assigned to any members yet.</div>
    <div v-else class='grid'>
        <div v-for = 'project in Object.keys(this.allProjects)' :key = 'project' style='display: flex; align-items: center; justify-content: center;  max-width:90%;'>
            
            <!-- <n-card embedded> -->
            <n-card embedded style='display: flex; align-items: center; justify-content: center; '>
                <div style='text-align: center'>
                <ProfilePictureWithoutButton :userEmail = 'project' style='text-align: center'/>
                <ProgressCircle :completed = this.allProjects[project].completed :inProgress = this.allProjects[project].inProgress :overdue = this.allProjects[project].overdue />
                </div>
                <!-- </n-card> -->
            </n-card>
        </div>
    </div>


</div>
</div>
</template>

<script>

import Sidebar from '@/components/sidebar/Sidebar'
import ProfilePictureWithoutButton from '@/components/ProfilePictureWithoutButton.vue'
import  ProgressCircle from '@/components/ProgressCircle.vue'
import  Header from '@/components/Header.vue'

import { sidebarWidth } from '@/components/sidebar/state'
// import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from '../firebase.js'
import { collection, getDocs, getFirestore} from 'firebase/firestore'
var db = getFirestore(firebaseApp)

export default {
    components:{
        Sidebar,
        ProfilePictureWithoutButton,
        ProgressCircle,
        Header
    },
    mounted() {
        console.log(this.$route.params.id)
        var allProjects = getDocs(collection(db, 'Projects'))
        var allTasks = getDocs(collection(db, 'Tasks'))

        allProjects.then((querySnapshot) => {

            var projectTasks = []
            querySnapshot.forEach((doc) => {
                if (doc.id == this.$route.params.id) { 
                    var docData = doc.data()
                    var tasks = docData.Tasks
                    this.projectName = docData.Name

                    tasks.forEach((task) => {
                        projectTasks.push(task)
                    })
                }
            })

            var obj = {}
            projectTasks.forEach((taskId) => {
                allTasks.then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        if (doc.id == taskId) {
                            var docData = doc.data()
                            var InCharge = docData.InCharge
                            var ExpectedHours = docData.ExpectedHours
                            var CompletionStatus = docData.CompletionStatus

                            var currentTaskStatus = ''

                            if (CompletionStatus == 'Completed') {
                                currentTaskStatus = 'Completed'
                            } else {
                                if (new Date(docData.DeadLine) < new Date()) {
                                    currentTaskStatus = 'Overdue'
                                } else {
                                    currentTaskStatus = 'In Progress'
                                }
                            }

                            if (currentTaskStatus == 'Completed') {
                                if (!obj[InCharge]) {
                                    obj[InCharge] = {completed: ExpectedHours, inProgress: 0, overdue: 0}
                                } else {
                                    obj[InCharge]['completed'] += ExpectedHours
                                }
                            } else if (currentTaskStatus == 'In Progress') {
                                if (!obj[InCharge]) {
                                    obj[InCharge] = {completed: 0, inProgress: ExpectedHours, overdue: 0}
                                } else {
                                    obj[InCharge]['inProgress'] += ExpectedHours
                                }
                            } else {
                                if (!obj[InCharge]) {
                                    obj[InCharge] = {completed: 0, inProgress: 0, overdue: ExpectedHours}
                                } else {
                                    obj[InCharge]['overdue'] += ExpectedHours
                                }
                            }

                        }
                    })
                    this.allProjects = obj
                    
                })
            })

        })
    },
    data() {
        return{
            allProjects:false,
            projectName:'',
            title:'Member Statistics Page'
        }
    },
    setup() {
        return {sidebarWidth}
    },
    methods:{
        backToProjectPage() {
            var projectId = this.$route.params.id
            this.$router.push("/ProjectPage/" + projectId);
        },
    }
}
</script>

<style>

.template{
    padding-left:30px;
}

.grid {
  display: grid;
  grid-template-columns: 50% 50%;
  row-gap:50px

}
</style>