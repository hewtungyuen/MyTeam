<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="sortName">Sort By Name (Ascend)</n-button>
      <n-button @click="filterAddress">Filter by name</n-button>
      <n-button @click="clearFilters">Clear Filters</n-button>
      <n-button @click="clearSorter">Clear Sorter</n-button>
    </n-space>
    <n-data-table
      ref="table"
      :columns="this.column"
      :data="this.$store.state.data"
      :pagination="pagination"
      :key="componentKey"
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
      componentKey: 0,
      column: []
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
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
          key: "TaskDetails",
        },
        {
          title: "Update Status",
          key: "UpdateStatus",
          render (row) {
            return h(
              NButton,
              {
                size: 'small',
                onClick: () => {
                  console.log("Entered update")
                  let status = parseInt(row.ProgressStatus);
                  if (status < 100) {
                    status += 10; 
                  }

                  taskDetails.then((QuerySnapshot) => {
                    QuerySnapshot.forEach((docs) => {
                      let yy = docs.data();

                      if (row.TaskName == yy.TaskName) {
                        updateDoc(doc(db, "Tasks", docs.id), {
                          ProgressStatus : status,
                        }).then ((user) => {
                          console.log(user);
                          location.reload();
                          // this.$router.push('/ProjectPage/' + yy.projectID);
                        });
                      }
                      
                      if (row.TaskName == yy.TaskName && status >= 100) {
                        updateDoc(doc(db, "Tasks", docs.id), {
                          CompletionStatus : "Completed"
                        })
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
          render (row) {
            return h(
              NButton,
              {
                size: 'small',
                onClick: () => {
                  taskDetails.then((QuerySnapshot) => {
                    QuerySnapshot.forEach((docs) => {
                      let yy = docs.data();

                      if (row.TaskName == yy.TaskName) {
                        updateDoc(doc(db, "Tasks", docs.id), {
                          ProgressStatus : 100,
                        });
                      }

                      if (row.TaskName == yy.TaskName) {
                        updateDoc(doc(db, "Tasks", docs.id), {
                          CompletionStatus : "Completed"
                        })
                      }
                    })
                  })
                }
              },
              { default: () => 'Complete Task' }
            )
          }
        },
      ];
    };

    //this.$store.commit("updateColumn", createColumns());
    this.column = createColumns();


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
</script>
