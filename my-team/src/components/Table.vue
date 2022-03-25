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
import { h, defineComponent, ref } from 'vue'
import { NButton,NProgress } from 'naive-ui'
// import firebaseApp from '../firebase.js';
// import {getAuth, onAuthStateChanged} from "firebase/auth";
// import {getFirestore} from "firebase/firestore";
// import {collection, getDocs} from "firebase/firestore";

// const db = getFirestore(firebaseApp);
const createColumns = ({ updateProgress }) => [
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
    key: 'progressstatus',
    render () {
      return h(
        NProgress,
        {
          percentage: "50",

        }
      )
    }
  },
  {
    title: 'Update Status',
    key: 'updatestatus',
    render () {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => updateProgress(),
        },
        { default: () => 'Update Progress (10%)' }
      )
    }
  }
]


const createData = () => [
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
    const tableRef = ref(null);
    const percentageRef = ref(0);

    return {
      percentage: percentageRef,
      table: tableRef,
      data: createData(),
      columns: createColumns({
        updateProgress() {
          percentageRef.value += 10;
          if (percentageRef.value > 100) {
            percentageRef.value = 100;
          } 
        }
      }),
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
      },
      // updateProgress () {
      //   percentageRef.value += 10;
      //   if (percentageRef.value > 100) {
      //     percentageRef.value = 0;
      //   }
      // },
    }
  },
})
</script>