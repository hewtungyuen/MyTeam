<template>
  <n-space vertical :size="12">
    <n-data-table
      ref="table"
      :columns="this.column"
      :data="this.data"
      :pagination="pagination"
      :row-class-name="rowClassName"
    />
  </n-space>
</template>

<script>
import { h, ref } from "vue";
import { NButton, NProgress, NText } from "naive-ui";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, updateDoc, doc} from "firebase/firestore";
const db = getFirestore(firebaseApp);



export default {
  data() {
    return {
      user: false,
      column: [],
      data: []
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

    const createColumns = (user) => {
      return [
        {
          type: 'expand',
          key: "TaskName",
          expandable: (rowData) => rowData.TaskName,
          renderExpand: (rowData) => {
            return rowData.Description
          } 
        },
        {
          title: "S/N",
          key: "index",
          render(row,index) {
            return h(
              NText,
              {
              },
              { default: () => index + 1 }
            );
          },
        },
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
          title: "Update Status",
          key: "UpdateStatus",
          render (row) {
            return h(
              NButton,
              {
                size: 'small',
                onClick: () => {
                  let status = parseInt(row.ProgressStatus);
                  if (status < 100) {
                    status += 25; 
                  }
                  taskDetails.then((QuerySnapshot) => {
                    QuerySnapshot.forEach((docs) => {
                      let yy = docs.data();
                      

                      if (row.TaskName == yy.TaskName && row.InCharge == yy.InCharge) {
                        console.log(user);
                        console.log("here");
                        let boo = confirm(
                          "Confirm on updating " + row.TaskName + " ?"
                        );

                        if (boo == true) {
                          if (status >= 100) {
                            updateDoc(doc(db, "Tasks", docs.id), {
                              CompletionStatus : "Completed"
                            })
                          }

                          updateDoc(doc(db, "Tasks", docs.id), {
                            ProgressStatus : status,
                          }).then ((user) => {
                            console.log(user);
                            // location.reload();
                            //this.$router.push('/ProjectPage/' + yy.projectID);
                          });
                        }
                      }
                    })
                  })
                }
              },
              { default: () => 'Update Progress (25%)'}
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
                        let boo = confirm(
                          "Confirm on completing " + row.TaskName + " ?"
                        );
                        if (boo == true) {
                          updateDoc(doc(db, "Tasks", docs.id), {
                            ProgressStatus : 100,
                            CompletionStatus : "Completed"
                          }).then ((user) => {
                            console.log(user);
                            location.reload();
                            // this.$router.push('/ProjectPage/' + yy.projectID);
                          });
                        }
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
    this.column = createColumns(this.user);


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
          this.data = this.$store.state.data;
        }
      });
    });
  },
  setup() {
    const tableRef = ref(null);
    var val = 0;

    return {
      table: tableRef,
      value: val,
      pagination: { pageSize: 5 }
    };
  },
};
</script>
