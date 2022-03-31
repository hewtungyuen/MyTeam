<template>
  <Sidebar/>
  <AddMember  @addedMem="change"/>
  <ProjectLabel :key="refreshComp"/>
  <AddTask @addedTask = "change2"/>
  <AddAMeeting @addedMeeting = "change2"/>
  <ProjectToggleBar :key = "refresh2"/>
</template>

<script>
import ProjectLabel from '@/components/ProjectLabel.vue';
import ProjectToggleBar from '@/components/ProjectToggleBar.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import AddMember from '@/components/AddMember.vue'
import AddTask from '@/components/AddTask.vue'
import AddAMeeting from '@/components/AddAMeeting.vue'
import { sidebarWidth } from '@/components/sidebar/state'

export default {
  name: 'ProjectPage',

  components: { 
    ProjectLabel,
    ProjectToggleBar,
    Sidebar,
    AddTask,
    AddMember,
    AddAMeeting
  },

  setup() {
        return {sidebarWidth}
  },
  data() {
    return{
      refreshComp:0,
      refresh2:0
    
    }
  },
   methods:{
    change(){
      this.refreshComp += 1
      console.log("refreshComp is" +this.refreshComp)
    },
    change2(){
      this.refresh2 += 1
    }
  }
}
</script>