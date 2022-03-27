<template>
  <Sidebar/>
  <ProfileInfo/>
  <ProfileProjectTable/>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'
import ProfileProjectTable from '@/components/ProfileProjectTable.vue'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
  name: 'ProfilePage',

  components: { 
    Sidebar,
    ProfileInfo,
    ProfileProjectTable
  },

 
    setup() {
        return {sidebarWidth}
  }
}
</script>

<style>

</style>