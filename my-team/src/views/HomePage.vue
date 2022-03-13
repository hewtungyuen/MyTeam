<template>
<div>
<h1 id = 'welcome'> Welcome, {{name}} </h1>
<n-grid :cols = '2'>

    <n-gi id = 'projects'>

        <n-grid :cols = "2" id = 'titleAndButton'>

            <n-gi>
                <h2 id = 'myProjectsTitle'>My Projects</h2>
            </n-gi>

            <n-gi>
                <n-button id = 'addProjectButton' strong secondary round @click = 'addNewProject()'>
                    +
                </n-button>
            </n-gi>

        </n-grid>

        <div id = 'projectsTable' >
            <Table/>
        </div>
    </n-gi> 
    
    <n-gi>

        <div >
            <h2 class = 'meetingsAndDeadlines' >Meetings</h2>
            <n-layout class = 'meetingsAndDeadlines' id = 'meetings' >
                
                <n-layout-sider :native-scrollbar="false" bordered>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                </n-layout-sider>

            </n-layout>

            <br>
            
            <h2 class = 'meetingsAndDeadlines'>Deadlines</h2>   
            
            <n-layout class = 'meetingsAndDeadlines' id = 'deadlines'>

                <n-layout-sider :native-scrollbar="false" bordered>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                    <DeadlinesAndMeetings/>
                </n-layout-sider>

            </n-layout>
        </div>
    </n-gi>
</n-grid>
</div>
</template>

<script>

import DeadlinesAndMeetings from '@/components/DeadlinesAndMeetings.vue'
import Table from '@/components/Table.vue'
export default {
    name: 'HomePage',
    components:{
        DeadlinesAndMeetings,
        Table
    },
    data(){
        return {
            name: 'John Snow'
        }
    },
    methods:{
        addNewProject(){
            alert('Add a new project')
        }
    }
}
</script>

<style scoped>
    .n-layout {
        height: 400px;
        width: 300px;
    }

    #projects{
        margin-left: 30px;
    }

    .meetingsAndDeadlines{
        left: 35%;
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