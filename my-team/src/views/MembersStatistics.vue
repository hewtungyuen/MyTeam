<template>
<div>
    <Sidebar/>

    {{this.allProjects}}
</div>
</template>

<script>

import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
// import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from '../firebase.js'
import { collection, getDocs, getFirestore} from 'firebase/firestore'
var db = getFirestore(firebaseApp)

export default {
    components:{
        Sidebar,
    },
    mounted() {
        var allProjects = getDocs(collection(db, 'Projects'))
        var allTasks = getDocs(collection(db, 'Tasks'))

        allProjects.then((querySnapshot) => {

            var projectTasks = []
            querySnapshot.forEach((doc) => {
                if (doc.id == 'zomniddiNMkCiSv2y095') { // change this 
                    console.log(doc.id) 
                    var docData = doc.data()
                    var tasks = docData.Tasks

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
            allProjects:false
        }
    },
    setup() {
        return {sidebarWidth}
    },
}
</script>

<style>

</style>