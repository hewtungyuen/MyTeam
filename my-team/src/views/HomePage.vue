<template>
<div>
<Sidebar/>
<h1 id = 'welcome'> Welcome, {{name}} </h1>
<n-grid :cols = '2'>
    <n-gi id = 'projects'>
        <n-grid :cols = "2" id = 'titleAndButton'>
            <n-gi>
                <h2 id = 'myTasksTitle'>My Tasks</h2>
            </n-gi>
            <n-gi>
                <n-button id = 'addProjectButton' strong secondary round @click = 'addNewProject()'>
                    Create a new project +
                </n-button>
            </n-gi>
            <n-gi>
                <n-button id = 'update' strong secondary round @click = 'update()'>
                    Update +
                </n-button>
            </n-gi>
        </n-grid>

        <div id = 'projectsTable' >
            <ProjectsTable/>
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
import ProjectsTable from '@/components/ProjectsTable.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'


export default {
    name: 'HomePage',
    components:{
        DeadlinesAndMeetings,
        ProjectsTable,
        Sidebar,
    },
    data(){
        return {
            name: 'John Snow'
        }
    },
    methods:{
        addNewProject(){
            alert('Add a new project');
            this.$router.push('/NewProjPage');
        },
        update() {
            this.$store.commit('update', "387UsydZXmACIAU9WQMk");
            console.log(this.$store.state.projectID);
            console.log(this.$store.state.name);
        }
    },
    setup() {
        return {sidebarWidth}
    },
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