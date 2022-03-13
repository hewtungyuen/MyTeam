<template>
  <n-card >
    <h3 @click = 'goToProjects()'>{{title}}</h3>
    {{content}}
  </n-card>
</template>

<script>
// need to calculate how many days left to the meeting 
export default {
    data(){
        return {
            title: 'Title of meeting',
            content : 'Meeting on DD/MM/YYYY'
        }
    },
    methods:{
        goToProjects(){
            this.$router.push('ProjectPage')
        }
    }
}

</script>

<style scoped>
    .n-card {
    background-color: aquamarine;
    }

    h3:hover{
        color:blue;
        cursor: pointer;
    }
</style>