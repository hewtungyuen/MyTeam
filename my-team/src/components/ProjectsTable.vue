<template>
  <n-space vertical :size="12">
    <br>
    <!-- <n-space>
      <n-button @click="filterProject">Filter By Project</n-button> 
      <n-button @click="clearFilters">Clear Filters</n-button>
    </n-space> -->
    <n-data-table
      ref="table"
      :columns="columns"
      :data="tasksToDisplay"
      :pagination="pagination"
      :row-class-name="rowClassName"
    />
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import DeadlinesAndMeetings from '@/components/DeadlinesAndMeetings.vue'
const columns = [
  {
    title: 'Task Name',
    key: 'TaskName',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Progress Status',
    key: 'ProgressStatus',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Deadline',
    key: 'DeadLineString',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },

]

// const data = this.tasksToDisplay

export default defineComponent({
  props:{
    tasksToDisplay:Object,
  },
  setup () {
    const tableRef = ref(null)
    return {
      // rowProps:() => {
      //   return{
      //     onClick: () => {
      //       alert('go to project page') // change cursor 
      //     }
      //   }
      // },

      // filterProject () {
      //   tableRef.value.filter({
      //     project: ['Project 1']
      //   })
      // },
      // clearFilters () {
      //   tableRef.value.filter(null)
      // },
      // clearSorter () {
      //   tableRef.value.sort(null)
      // }
      table: tableRef,
      // data,
      columns,
      pagination: { pageSize: 3 },
      rowClassName(row){
        if (new Date(row.DeadLineString) < new Date()) {
          return 'overdue'
        }
        return ''
      }
    }
  }
})
</script>

<style scoped>
  :deep(.overdue td) {
    color: red;
  }
</style>