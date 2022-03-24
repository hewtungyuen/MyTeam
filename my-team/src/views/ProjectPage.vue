<template>
  <Sidebar/>
  <ProjectLabel/>
  <ProjectToggleBar/>
  <n-button id = 'update' strong secondary round @click = 'update()'>
      Update +
  </n-button>
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
  },
}
</script>