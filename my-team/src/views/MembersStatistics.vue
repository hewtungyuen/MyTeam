<template>
<div>
    <Sidebar/>
    <h2> Statistics for {{this.projectName}} </h2>

    <div v-if = '!this.allProjects'> No tasks have been assigned</div>
    <div v-else v-for = 'project in Object.keys(this.allProjects)' :key = 'project'>
        
        <ProfilePictureWithoutButton :userEmail = 'project'/>
        <ProgressCircle :completed = this.allProjects[project].completed :inProgress = this.allProjects[project].inProgress :overdue = this.allProjects[project].overdue />
        <br>
    </div>

</div>
</template>

<script>

import Sidebar from '@/components/sidebar/Sidebar'
import ProfilePictureWithoutButton from '@/components/ProfilePictureWithoutButton.vue'
import  ProgressCircle from '@/components/ProgressCircle.vue'
import { sidebarWidth } from '@/components/sidebar/state'
// import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from '../firebase.js'
import { collection, getDocs, getFirestore} from 'firebase/firestore'
var db = getFirestore(firebaseApp)

export default {
    components:{
        Sidebar,
        ProfilePictureWithoutButton,
        ProgressCircle

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
        }
    },
    setup() {
        return {sidebarWidth}
    },
}
</script>

<style>

</style>