<template>
  <ProjectLabel/>
  <ProjectToggleBar/>
</template>

<script>
import ProjectLabel from '@/components/ProjectLabel.vue';
import ProjectToggleBar from '@/components/ProjectToggleBar.vue'

export default {
  name: 'ProjectPage',

  components: { 
    ProjectLabel,
    ProjectToggleBar
  }
}
</script>