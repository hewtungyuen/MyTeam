<template>
<div>
  <n-card embedded :bordered="false">
    <h3 v-if = "type == 'Meeting'" @click = 'goToMeetings()'>{{title}}</h3>
    <h3 v-if = "type == 'Task'" @click = 'goToProjects()'>{{title}}</h3>
    {{deadline}} 
  </n-card>
</div>

</template>

<script>
// need to calculate how many days left to the meeting 
export default {

    methods:{
        goToProjects(){
            alert('go to project page')
            // this.$router.push('ProjectPage')
        },
        goToMeetings(){
            alert('go to meetings tab in project page')
        }
    },
    props:{
        title:String,
        deadline:String,
        type:String,
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