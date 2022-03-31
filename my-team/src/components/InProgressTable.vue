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
      :columns="this.$store.state.column"
      :data="this.$store.state.data"
      :pagination="pagination"
    />
  </n-space>

  <n-button @click="showModal = true"> Start Me up </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> Oops! </template>
      Content
      <template #footer> Footer </template>
    </n-card>
  </n-modal>
</template>

<script>
import { h, defineComponent, ref } from "vue";
import { NButton, NProgress } from "naive-ui";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, updateDoc, doc} from "firebase/firestore";
const db = getFirestore(firebaseApp);



export default defineComponent({
  data() {
    return {
      user: false,
      output: [],
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });

    var taskDetails = getDocs(collection(db, "Tasks"));
    this.$store.commit("refreshData");


    const createColumns = () => {
      return [
        {
          title: "Task Name",
          key: "TaskName",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "In Charge",
          key: "InCharge",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "Expected Hours",
          key: "ExpectedHours",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "Deadline",
          key: "DeadLine",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "Progress Status",
          key: "ProgressStatus",
          render(row) {
            const status = row.ProgressStatus;
            return h(NProgress, {
              type: "line",
              percentage: status,
            });
          },
        },
        {
          title: "Task Details",
          key: "TaskDetails"
          // render () {
          //   return h(
          //     NButton,
          //     {
          //       size: 'small',
          //       onClick: () => show(),
          //     },
          //     { default: () => 'Task Details' }
          //   )
          // }
        },
        {
          title: "Update Status",
          key: "UpdateStatus",
          render (row) {
            var status = parseInt(row.ProgressStatus);
            return h(
              NButton,
              {
                size: 'small',
                onClick: () => {
                  if (status < 100) {
                    status += 10;
                  }

                  taskDetails.then((QuerySnapshot) => {
                    QuerySnapshot.forEach((docs) => {
                      let yy = docs.data();
                      if (row.TaskName == yy.TaskName) {
                        updateDoc(doc(db, "Tasks", docs.id), {
                          ProgressStatus : status,
                        });
                      }
                    })
                  })
                }
              },
              { default: () => 'Update Progress (10%)'}
            )
          }
        },
        {
          title: "Complete",
          key: "Complete",
          // render () {
          //   return h(
          //     NButton,
          //     {
          //       size: 'small',
          //       onClick: () => updateProgress(),
          //     },
          //     { default: () => 'Complete Task' }
          //   )
          // }
        },
      ];
    };

    this.$store.commit("updateColumn", createColumns());


    taskDetails.then((QuerySnapshot) => {
      const z = [];
      QuerySnapshot.forEach((doc) => {
        let yy = doc.data();
        if (
          yy.ProjectID == this.$route.params.id &&
          yy.CompletionStatus == "In Progress"
        ) {
          z.push(yy);
          this.$store.commit("updateData", z);
          console.log(this.$store.state.data);
        }
      });
    });
  },
  setup() {
    const tableRef = ref(null);

    return {
      showModal: ref(false),
      table: tableRef,
      pagination: { pageSize: 5 },
      filterAddress() {
        tableRef.value.filter({
          incharge: ["Yi Chen"],
        });
      },
      sortName() {
        tableRef.value.sort("name", "ascend");
      },
      clearFilters() {
        tableRef.value.filter(null);
      },
      clearSorter() {
        tableRef.value.sort(null);
      },
    };
  },
});

// const createColumns = () => {
//   return [
//     {
//       title: "Task Name",
//       key: "TaskName",
//       defaultSortOrder: "ascend",
//       sorter: "default",
//     },
//     {
//       title: "In Charge",
//       key: "InCharge",
//       defaultSortOrder: "ascend",
//       sorter: "default",
//     },
//     {
//       title: "Expected Hours",
//       key: "ExpectedHours",
//       defaultSortOrder: "ascend",
//       sorter: "default",
//     },
//     {
//       title: "Deadline",
//       key: "DeadLine",
//       defaultSortOrder: "ascend",
//       sorter: "default",
//     },
//     {
//       title: "Progress Status",
//       key: "ProgressStatus",
//       render(row) {
//         const status = row.ProgressStatus;
//         return h(NProgress, {
//           type: "line",
//           percentage: status,
//         });
//       },
//     },
//     {
//       title: "Task Details",
//       key: "TaskDetails",
//       // render () {
//       //   return h(
//       //     NButton,
//       //     {
//       //       size: 'small',
//       //       onClick: () => show(),
//       //     },
//       //     { default: () => 'More Details' }
//       //   )
//       // }
//     },
//     {
//       title: "Update Status",
//       key: "UpdateStatus",
//       // render () {
//       //   return h(
//       //     NButton,
//       //     {
//       //       size: 'small',
//       //       onClick: () => updateProgress(),
//       //     },
//       //     { default: () => 'Update Progress (10%)' }
//       //   )
//       // }
//     },
//     {
//       title: "Complete",
//       key: "Complete",
//       // render () {
//       //   return h(
//       //     NButton,
//       //     {
//       //       size: 'small',
//       //       onClick: () => updateProgress(),
//       //     },
//       //     { default: () => 'Complete Task' }
//       //   )
//       // }
//     },
//   ];
// };
</script>
