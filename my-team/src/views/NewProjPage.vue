<template>
  <Sidebar />
  <Header :title = "title"/>
  <CreateProj />

</template>

<script>
import CreateProj from '@/components/CreateProj.vue'
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
import Header from '@/components/Header.vue'

export default {
    name: 'NewProjPage',
    components:{
    CreateProj,
    Sidebar,
    Header
    },
    setup() {
      return {sidebarWidth}
    },
    data(){
      return{
        title:"Create A New Project"
      }
    }
}
</script>
