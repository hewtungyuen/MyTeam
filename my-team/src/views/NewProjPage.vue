<template>
  <Sidebar />
  <CreateProj />
</template>

<script>
import CreateProj from '@/components/CreateProj.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'

export default {
    name: 'NewProjPage',
    components:{
    CreateProj,
    Sidebar,
    },
    setup() {
      return {sidebarWidth}
    }
}
</script>

<style>
</style>