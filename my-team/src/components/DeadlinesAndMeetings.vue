<template>
<div>

  <n-card id = 'Deadline' embedded v-if = "type == 'Deadline'" v-bind:class="{overdue:isOverdue}">
    <h3 @click = 'goToProjects()'>{{title}}</h3>
    Project: {{this.name}}
    <br>
    Deadline: {{date.toDateString()}} 
  </n-card>

  <n-card embedded v-if = "type == 'Meeting' && !this.isOverDue()">
    <h3 @click = 'goToProjects()'>{{title}}</h3>
    Project: {{this.name}}
    <br>
    Date: {{date.toDateString()}}
    <br>
    Time: {{date.toTimeString().slice(0,8)}}
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
        // if (this.isOverDue()) {
        //     document.getElementById('Deadline').style.background = '#FFCCCB'
        // }
    },
    data(){
        return {
            name: '',
            isOverdue: this.isOverDue()
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
    .overdue {
    background-color: #FFCCCB;
    }

    h3:hover{
        color:blue;
        cursor: pointer;
    }
</style>