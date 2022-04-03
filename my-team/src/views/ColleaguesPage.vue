<template>
  <Sidebar />
  <ColleagueTable />
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
import ColleagueTable from '@/components/ColleagueTable'

export default {
    name: 'ColleaguesPage',
    components:{
    ColleagueTable,
    Sidebar,
    },
    setup() {
      return {sidebarWidth}
    }
}
</script>

<style>

</style>