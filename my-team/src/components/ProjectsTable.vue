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
      :row-props="rowProps"
    />
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'

const columns = [
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
    deadline: "15/3/2022"
  },
  {
    project: 'Project 2',
    taskname: "Finance report",
    progressstatus: "70%",
    deadline: "16/3/2022"
  },
  {
    project: 'Project 1',
    taskname: "Marketing report",
    progressstatus: "80%",
    deadline: "17/3/2022"
  },
    {
    project: 'Project 2',
    taskname: "Accounting report",
    progressstatus: "50%",
    deadline: "15/3/2022"
  }
]

export default defineComponent({
  setup () {
    const tableRef = ref(null)

    return {
      rowProps:() => {
        return{
          onClick: () => {
            alert('go to task page') // change cursor 
          }
        }
      },
      table: tableRef,
      data,
      columns,
      pagination: { pageSize: 3 },
      filterProject () {
        tableRef.value.filter({
          project: ['Project 1']
        })
      },
      clearFilters () {
        tableRef.value.filter(null)
      },
      clearSorter () {
        tableRef.value.sort(null)
      }
    }
  }
})
</script>