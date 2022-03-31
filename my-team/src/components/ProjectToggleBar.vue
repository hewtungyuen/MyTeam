<template>
  <n-tabs type="segment">
    <n-tab-pane name="inprogress" tab="In Progress">
      <InProgressTable />
    </n-tab-pane>
    <n-tab-pane name="completed" tab="Completed">
      <CompletedTable/>
    </n-tab-pane>
    <n-tab-pane name="Meetings" tab="Meetings">
      <!-- <Table/> -->
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import InProgressTable from '@/components/InProgressTable.vue';
import CompletedTable from '@/components/CompletedTable.vue';
// import Table from '@/components/Table.vue';

export default {
  name: 'ProjectToggleBar',
  components: { 
    InProgressTable,
    CompletedTable,
    // Table
  }
}
</script>