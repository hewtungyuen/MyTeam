<template>
  <Sidebar/>
  <ProjectLabel/>
  <ProjectToggleBar/>
</template>

<script>
import ProjectLabel from '@/components/ProjectLabel.vue';
import ProjectToggleBar from '@/components/ProjectToggleBar.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'

export default {
  name: 'ProjectPage',

  components: { 
    ProjectLabel,
    ProjectToggleBar,
    Sidebar
  },

  setup() {
        return {sidebarWidth}
  }
}
</script>