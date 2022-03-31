<template>
  <n-space vertical :size="12" :key="componentKey">
    <br>
    <n-space>
      <n-button @click="filterInProgress">In Progress</n-button> 
      <n-button @click="filterCompleted">Completed</n-button> 
      <n-button @click="clearFilters">Clear Filters</n-button>
    </n-space>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="this.projects"
    />
  </n-space>
</template>

<script>
import { ref } from 'vue'
import { collection, getDocs, getFirestore} from 'firebase/firestore'
import firebaseApp from '../firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth"
var db = getFirestore(firebaseApp)

const columns = [

  {
    title: 'Project',
    key: 'name',
    defaultSortOrder: 'false',
    sorter: 'default',
  },

  {
    title: 'Hours Completed',
    key: 'hoursCompleted',
    defaultSortOrder: 'false',
    sorter: 'default'
  },

    {
    title: 'Status',
    key: 'completionStatus',
    defaultSortOrder: 'ascend',
    sorter: 'default',
    defaultFilterOptionValues: ['Completed', 'In Progress'],
    filterOptions: [
      {
        label: 'Completed',
        value: 'Completed'
      },
      {
        label: 'In Progress',
        value: 'In Progress'
      }
    ],
    filter (value, row) {
      return ~row.completionStatus.indexOf(value)
    }
  },

  {
    title: 'Completion Date',
    key: 'completionDate',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },

]

// const data = [
//   {
//     project: 'Project 1',
//     hours: "30",
//     status: "Completed",
//     completeDate: new Date('2022','2','20').toDateString()
//   },
//   {
//     project: 'Project 2',
//     hours: "50",
//     status: "Completed",
//     completeDate: new Date('2022','2','22').toDateString()
//   },
//   {
//     project: 'Project 3',
//     hours: "45",
//     status: "In Progress",
//   },
// ]

export default {

  data() {
      return {
        projects: [],
        user: false,
        name: ''
      }

  },

  setup () {
    const tableRef = ref(null)

    return {
    
      table: tableRef,
      columns,
      filterInProgress () {
        tableRef.value.filter({
          completionStatus: 'In Progress'
        })
      },
      filterCompleted () {
        tableRef.value.filter({
          completionStatus: 'Completed'
        })
      },
      clearFilters () {
        tableRef.value.filter(null)
      },
    }
  },

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

        allUsers.then((querySnapshot) => {

            
            querySnapshot.forEach((doc) => {
                var docData = doc.data()
                if (docData.Email == this.user.email) {
                    var myProjects = []
                    this.name = docData.FullName
                    if (docData.Projects) {
                        myProjects = myProjects.concat(docData.Projects)
                    }

                    if (docData.LeadingProjects) {
                        myProjects = myProjects.concat(docData.LeadingProjects)
                    }
                    this.projectIds = myProjects
                }
            })
            

            this.projectIds.forEach((projId) => {
                
                allProjects.then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.id == projId) {
                            var project = {}
                            var projData = doc.data()
                            project.name = projData.Name
                            project.completionStatus = projData.CompletionStatus
                            if (projData.CompletionStatus == 'Completed') {
                                project.completionDate = projData.CompletionDate
                            }
                            var projectTasks = projData.Tasks
        

                            allTasks.then((querySnapshot) => {
                                var hoursCompleted = 0 
                                querySnapshot.forEach((doc) => {
                                    var taskData = doc.data()
                                    if (taskData.InCharge == this.user.email 
                                    && projectTasks.includes(doc.id)
                                    && taskData.CompletionStatus == 'Completed') {
                                        hoursCompleted += taskData.ExpectedHours
                                    }
                                })
                                project.hoursCompleted = hoursCompleted
                                this.projects.push(project)
                                

                                

                            })
                            
                        }
                        
                    })
                    
                })
                
            })
        });
        
        
        console.log(this.test)
  }

}
</script>

<style scoped>
</style>