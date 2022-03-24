<template>
  <Sidebar/>
  <ProfileInfo/>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
  name: 'ProfilePage',

  components: { 
    Sidebar,
    ProfileInfo,
  },

 
    setup() {
        return {sidebarWidth}
  }
}
</script>

<style>

</style>