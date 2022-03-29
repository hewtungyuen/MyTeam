<template>
<div>
  <n-card embedded :bordered="false">
    <h3 v-if = "type == 'Meeting'" @click = 'goToMeetings()'>{{title}}</h3>
    <h3 v-if = "type == 'Deadline'" @click = 'goToProjects()'>{{title}}</h3>
    Project: {{this.name}}
    <br>
    Deadline: {{deadline}} 
    <br>
  </n-card>
</div>

</template>

<script>
import firebaseApp from '../firebase.js'
import { collection, getDocs, getFirestore} from 'firebase/firestore'
var db = getFirestore(firebaseApp)

// need to calculate how many days left to the meeting 
export default {
    mounted(){
        this.getProjectName()
    },
    data(){
        return {
            name: ''
        }
    },
    methods:{
        goToProjects(){
            this.$store.commit('update', this.projectId);
            // console.log(projectIds)
            this.$router.push('/ProjectPage/' + this.projectId);
        },
        goToMeetings(){

            alert('go to meetings tab in project page')
        },
        getProjectName(){
            var allProjects = getDocs(collection(db,'Projects'))
            allProjects.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.id == this.projectId) {
                        this.name = doc.data().Name
                    }
                })
            })
        }

    },
    props:{
        title:String,
        deadline:String,
        type:String,
        projectId:String,
    }
}

</script>

<style scoped>
    /* .n-card {
    background-color: #2f855a;
    } */

    h3:hover{
        color:blue;
        cursor: pointer;
    }
</style>