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
      :data="data"
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
    type: 'expand',
    expandable: () => true,
    renderExpand: () => {
      return 'string'
    }
  },
  {
    title: 'Project',
    key: 'project',
    defaultSortOrder: 'ascend',
    sorter: 'default',
    filterOptions: [
      {
        label: 'Project 1',
        value: 'Project 1'
      },
      {
        label: 'Project 2',
        value: 'Project 2'
      }
    ],
    filter (value, row) {
      return ~row.project.indexOf(value)
    }
  },
  {
    title: 'Task Name',
    key: 'taskname',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Progress Status',
    key: 'progressstatus',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Deadline',
    key: 'deadline',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },

]

const data = [
  {
    project: 'Project 1',
    taskname: "Accounting report",
    progressstatus: "50%",
    deadline: new Date('2022','2','20').toDateString()
  },
  {
    project: 'Project 2',
    taskname: "Finance report",
    progressstatus: "70%",
    deadline: new Date('2022','4','22').toDateString()
  },
  {
    project: 'Project 3',
    taskname: "Marketing report",
    progressstatus: "80%",
    deadline: new Date('2022','4','22').toDateString()
  },
]

export default defineComponent({
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
      data,
      columns,
      pagination: { pageSize: 3 },
      rowClassName(row){
        if (new Date(row.deadline) < new Date()) {
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