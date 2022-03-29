<template>
<div>
  <n-card id = 'card' embedded :bordered="false" >
    <h3 v-if = "type == 'Meeting'" @click = 'goToProjects()'>{{title}}</h3>
    <h3 v-if = "type == 'Deadline'" @click = 'goToProjects()'>{{title}}</h3>
    Project: {{this.name}}
    <br>
    <div v-if = "type == 'Deadline'"> Deadline: {{date.toDateString()}}  </div> 
    <div v-if = "type == 'Meeting'"> Date: {{date.toDateString()}}  </div> 
    <div v-if = "type == 'Meeting'"> Time: {{date.toTimeString().slice(0,8)}}  </div> 

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
        if (this.isOverDue()) {
            document.getElementById('card').style.background = '#FFCCCB'
        }
    },
    data(){
        return {
            name: ''
        }
    },
    methods:{
        goToProjects(){
            this.$store.commit('update', this.projectId);
            this.$router.push('/ProjectPage/' + this.projectId);
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
        },
        isOverDue(){
            if (this.date < new Date()) {
                return true
            }
        }

    },
    props:{
        title:String,
        date:Date,
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