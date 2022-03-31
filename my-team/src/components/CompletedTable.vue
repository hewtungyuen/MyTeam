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
      :data="this.$store.state.data"
      :pagination="pagination"
    />
  </n-space>
</template>

<script>
import { h, defineComponent, ref } from 'vue'
import { NButton,NProgress } from 'naive-ui'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
const db = getFirestore(firebaseApp);

const createColumns = ({ updateProgress }) => [
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
  },
  {
    title: 'Expected Hours',
    key: 'ExpectedHours',
    defaultSortOrder: 'ascend',
    sorter: 'default',
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
        NProgress
      )
    }
  },
  {
    title: 'Task Details',
    key: 'ProgressStatus',
    render () {
      return h(
        NButton,
        {
          size: 'small',
          onClick: () => updateProgress(),
        },
        { default: () => 'Task details' }
      )
    }
  },
  {
    title: 'Update Status',
    key: 'UpdateStatus',
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


// const createData = [
//   {
//     key: 0,
//     sn: 1,
//     TaskName: "Accounting report",
//     InCharge: "Tung Yuen",
//     DeadLine: "15/3/2022"
//   },
//   {
//     key: 0,
//     sn: 2,
//     TaskName: "Finance report",
//     InCharge: "Yi Chen",
//     DeadLine: "16/3/2022"
//   }
// ]


export default defineComponent({
    data() {
      return {
        user: false,
        output: []
      }
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
          if(user) {
            this.user = user;
          }
      });
      console.log("Table");

      let taskDetails = getDocs(collection(db, "Tasks"));
      this.$store.commit('refreshData');

      taskDetails.then((QuerySnapshot) => {
        console.log("Entered task details");
        const z = [];
        QuerySnapshot.forEach((doc) => {
          let yy = doc.data();
          if (yy.ProjectID == this.$route.params.id && yy.CompletionStatus == "Completed") {
            z.push(yy);
            this.$store.commit('updateData', z);
            console.log(this.$store.state.data);
          } 
        })
      });
    },
  setup () {
    const tableRef = ref(null);
    const percentageRef = ref(0);

    return {
      percentage: percentageRef,
      table: tableRef,
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