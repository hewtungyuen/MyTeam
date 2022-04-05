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
import { NButton, NProgress } from "naive-ui";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, updateDoc, doc, deleteDoc, arrayRemove} from "firebase/firestore";
const db = getFirestore(firebaseApp);



export default {
  data() {
    return {
      user: false,
      email: "",
      column: [],
      data: []
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.column = createColumns(user.email, this.$route.params.id);
      }
    });


    var taskDetails = getDocs(collection(db, "Tasks"));
    this.$store.commit("refreshData");

    const createColumns = (email, projID) => {
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
            if (row.InCharge == email) {
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
                        console.log("yoyo " + email);
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
                            location.reload();
                            //this.$forceUpdate();
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
          }
        },
        {
          title: "Complete",
          key: "Complete",
          render (row) {
            if (row.InCharge == email) {
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
          }
        },
        {
          title: "DeleteTask",
          key: "DeleteTask",
          render(row) {
            if (row.InCharge == email) {
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
                            "Confirm on deleting " + row.TaskName + " ?"
                          );
                          if (boo == true) {
                            updateDoc(doc(db, "Projects", projID), {
                              Tasks : arrayRemove(docs.id)
                            })

                            deleteDoc(doc(db, "Tasks", docs.id)
                            ).then ((user) => {
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
                { default: () => 'Delete Task' }
              );
            }
          },
        },
      ];
    };


    //this.$store.commit("updateColumn", createColumns());


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
      pagination: { pageSize: 5 },
      rowClassName(row) {
        if (new Date(row.DeadLine) < new Date()) {
          return 'overdue'
        }
        return ''
      }
    };
  },
};
</script>

<style scoped>
  :deep(.overdue td) {
    color: red;
  }
</style>