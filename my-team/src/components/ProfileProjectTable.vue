<template>
  <n-space vertical :size="12">
    <br>
    <n-space>
      <n-button @click="filterInProgress">In Progress</n-button> 
      <n-button @click="filterCompleted">Completed</n-button> 
      <n-button @click="clearFilters">Clear Filters</n-button>
    </n-space>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :row-class-name="rowClassName"
    />
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'
const columns = [

  {
    title: 'Project',
    key: 'project',
    defaultSortOrder: 'false',
    sorter: 'default',
  },

  {
    title: 'Hours Completed',
    key: 'hours',
    defaultSortOrder: 'false',
    sorter: 'default'
  },

    {
    title: 'Status',
    key: 'status',
    defaultSortOrder: 'ascend',
    sorter: 'default',
    filterOptions: [
      {
        label: 'Completed',
        value: 'Completed'
      },
      {
        label: 'In Progress',
        value: 'In Progress'
      }
    ],
    filter (value, row) {
      return ~row.status.indexOf(value)
    }
  },

  {
    title: 'Completion Date',
    key: 'completeDate',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },

]

const data = [
  {
    project: 'Project 1',
    hours: "30",
    status: "Completed",
    completeDate: new Date('2022','2','20').toDateString()
  },
  {
    project: 'Project 2',
    hours: "50",
    status: "Completed",
    completeDate: new Date('2022','2','22').toDateString()
  },
  {
    project: 'Project 3',
    hours: "45",
    status: "In Progress",
  },
]

export default defineComponent({
  setup () {
    const tableRef = ref(null)

    return {
    
      table: tableRef,
      data,
      columns,
      filterInProgress () {
        tableRef.value.filter({
          status: 'In Progress'
        })
      },
      filterCompleted () {
        tableRef.value.filter({
          status: 'Completed'
        })
      },
      clearFilters () {
        tableRef.value.filter(null)
      },
    }
  }
})
</script>

<style scoped>
</style>