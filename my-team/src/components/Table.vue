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


import firebaseApp from '../firebase.js';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
const db = getFirestore(firebaseApp);

const createColumns = ({ updateProgress }) => [
  {
    title: 'S/N',
    key: 'sn',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Task Name',
    key: 'TaskName',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'In Charge',
    key: 'InCharge',
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
    key: 'DeadLine',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Progress Status',
    key: 'ProgressStatus',
    render () {
      return h(
        NProgress,
        {
          percentage: "10",

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

const createData = []

export default defineComponent({
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
          if(user) {
            this.user = user;
          }
      });

      let taskDetails = getDocs(collection(db, "Tasks"));
      console.log("Tasks" + taskDetails);

      taskDetails.then((QuerySnapshot) => {

        QuerySnapshot.forEach((doc) => {
          let yy = doc.data();
          if (yy.ProjectID == this.$store.state.projectID) {
            createData.push(yy);
            //console.log(this.dataStore);
          }
        })
      });
      console.log(createData);
      console.log("hi 2");
    },
    setup() {
      const tableRef = ref(null);
      const percentageRef = ref(0);

      return {
        percentage: percentageRef,
        table: tableRef,
        data: createData,
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
      }
    }
})
</script>