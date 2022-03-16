<template>
  <n-tabs type="segment">
    <n-tab-pane name="inprogress" tab="In Progress">
      <Table/>
    </n-tab-pane>
    <n-tab-pane name="completed" tab="Completed">
      <Table/>
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  name: 'ProjectToggleBar',

  components: { 
    Table
  }
}
</script>