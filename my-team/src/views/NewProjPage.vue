<template>
  <Sidebar/>
  <CreateProj/>
</template>

<script>
import CreateProj from '@/components/CreateProj.vue'
import Sidebar from '@/components/sidebar/Sidebar'
export default {
    name: 'NewProjPage',
    components:{
    CreateProj,
    Sidebar,
  }

}
</script>

<style>

</style>