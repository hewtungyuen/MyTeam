<template>

  <Sidebar/>
  <n-grid :cols = '4'>
      <n-gi id = "picture">
        <ProfilePicture/>
      </n-gi>
      <n-gi id = "info" span = "3">
        <ProfileInfo/>
      </n-gi>
  </n-grid>
  <ProfileProjectTable id = "table" />
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'
import ProfileProjectTable from '@/components/ProfileProjectTable.vue'
import ProfilePicture from '@/components/ProfilePicture.vue'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
  name: 'ProfilePage',

  components: { 
    Sidebar,
    ProfileInfo,
    ProfileProjectTable,
    ProfilePicture
  },

 
    setup() {
        return {sidebarWidth}
  }
}
</script>

<style scoped>
    #table {
        padding:30px
    }

    #picture {
        padding: 30px
    }

    #info {
        padding: 30px
    }


</style>