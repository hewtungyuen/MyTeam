<template>
  <Sidebar/>
  <ProjectLabel/>
  <AddTask/>
  <ProjectToggleBar/>
</template>

<script>
import ProjectLabel from '@/components/ProjectLabel.vue';
import ProjectToggleBar from '@/components/ProjectToggleBar.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import AddTask from '@/components/AddTask.vue'
import { sidebarWidth } from '@/components/sidebar/state'

export default {
  name: 'ProjectPage',

  components: { 
    ProjectLabel,
    ProjectToggleBar,
    Sidebar,
    AddTask
  },

  setup() {
        return {sidebarWidth}
  },
}
</script>