<template>
  <n-tabs type="segment">
    <n-tab-pane name="inprogress" tab="In Progress">
      <InProgressTable />
    </n-tab-pane>
    <n-tab-pane id="completed" name="completed" tab="Completed">
      <CompletedTable/>
    </n-tab-pane>
    <n-tab-pane name="Meetings" tab="Meetings">
      <MeetingTable/>
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import InProgressTable from '@/components/InProgressTable.vue';
import CompletedTable from '@/components/CompletedTable.vue';
import MeetingTable from '@/components/MeetingTable.vue';

export default {
  name: 'ProjectToggleBar',
  components: { 
    InProgressTable,
    CompletedTable,
    MeetingTable
  }
}
</script>

<style scoped>

.custom-tabs .n-tab-pane .completed {
  background-color: red ;
  color: red;
}

</style>