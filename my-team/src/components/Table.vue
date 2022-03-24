<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="sortName">Sort By Name (Ascend)</n-button>
      <n-button @click="filterAddress">Filter Address (London)</n-button>
      <n-button @click="clearFilters">Clear Filters</n-button>
      <n-button @click="clearSorter">Clear Sorter</n-button> 
    </n-space>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'

const columns = [
  {
    title: 'S/N',
    key: 'sn',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Task Name',
    key: 'taskname',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'In Charge',
    key: 'incharge',
    defaultSortOrder: 'ascend',
    sorter: 'default',
    defaultFilterOptionValues: ['Yi Chen', 'Tung Yuen', 'Marvin'],
    filterOptions: [
      {
        label: 'Yi Chen',
        value: 'Yi Chen'
      },
      {
        label: 'Tung Yuen',
        value: 'Tung Yuen'
      }, 
      {
        label: 'Marvin',
        value: 'Marvin'
      }
    ],
    filter (value, row) {
      return ~row.incharge.indexOf(value)
    }
  },
  {
    title: 'Deadline',
    key: 'deadline',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Progress Status',
    key: 'progressstatus'
  },
  {
    title: 'Update Status',
    key: 'updatestatus'
  }
]

const data = [
  {
    key: 0,
    sn: 1,
    taskname: "Accounting report",
    incharge: "Tung Yuen",
    deadline: "15/3/2022"
  },
  {
    key: 0,
    sn: 2,
    taskname: "Finance report",
    incharge: "Yi Chen",
    deadline: "16/3/2022"
  },
  {
    key: 0,
    sn: 3,
    taskname: "Marketing report",
    incharge: "Marvin",
    deadline: "17/3/2022"
  }
]
export default defineComponent({
  setup () {
    const tableRef = ref(null)
    return {
      table: tableRef,
      data,
      columns,
      pagination: { pageSize: 5 },
      filterAddress () {
        tableRef.value.filter({
          incharge: ['Yi Chen']
        })
      },
      sortName () {
        tableRef.value.sort('name', 'ascend')
      },
      clearFilters () {
        tableRef.value.filter(null)
      },
      clearSorter () {
        tableRef.value.sort(null)
      }
    }
  },
  computed: {
    ...mapGetters({
      count: 'count'
    })
  },
})
</script>