<template>
  <Sidebar/>
  <ProjectLabel/>
  <AddMember/>
  <AddTask/>
  <AddAMeeting />
  <ProjectToggleBar/>
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
}
</script>