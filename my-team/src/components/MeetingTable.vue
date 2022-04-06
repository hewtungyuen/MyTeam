<template>
  <n-space vertical :size="12">
    <n-data-table
      ref="table"
      :columns="this.column"
      :data="this.data"
      :pagination="pagination"
      :key="componentKey"
      :row-class-name="rowClassName"
      @update:sorter="handleSorterChange"
    />
  </n-space>
</template>

<script>
import { h, defineComponent, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { NButton } from "naive-ui";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default defineComponent({
  data() {
    return {
      user: false,
      componentKey: 0,
      column: [],
      data: [],
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(user);
        this.column = createColumns(user.email);
      }
    });

    var meetingDetails = getDocs(collection(db, "Meetings"));
    this.$store.commit("refreshData");

    // Update all the meetings into the store
    meetingDetails.then((QuerySnapshot) => {
      const z = [];
      QuerySnapshot.forEach((doc) => {
        let yy = doc.data();

        if (
          yy.ProjectID == this.$route.params.id &&
          yy.MembersEmail.includes(this.user.email)
        ) {
          // Putting a key with the meeting id
          yy.key = doc.id;

          /////// Creating a new list of names with commas //////
          var newMemberNames = [];
          for (var t = 0; t < yy.Members.length; t++) {
            if (t == yy.Members.length - 1) {
              newMemberNames.push(yy.Members[t]);
            } else {
              var n = yy.Members[t] + ", ";
              newMemberNames.push(n);
            }
          }
          // Changing the Members to the new member names with commas
          yy.Members = newMemberNames;
          // console.log(yy);

          // Storing the data into the store
          z.push(yy);
          this.$store.commit("updateData", z);
          this.data = this.$store.state.data;
        }
      });
    });

    const createColumns = (email) => {
      return [
        {
          type: "expand",
          key: "key",
          expandable: (rowData) => rowData.key,
          renderExpand: (rowData) => {
            return "Details: " + rowData.Details;
          },
        },
        {
          title: "Meeting Name",
          key: "Name",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "In Charge",
          key: "LeaderName",
          // sorter: "default",
        },
        {
          title: "Date, Time",
          key: "DateTime",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "Members Involved",
          key: "Members",
          defaultSortOrder: "ascend",
          sorter: "default",
          width: "200px",
        },
        {
          title: "Status",
          key: "Status",
          className: "Status",
          defaultSortOrder: "ascend",
          sorter: "default", 
        },
        {
          title: "Action",
          key: "action",
          // sorter: "default",
          render(row) {
            if (row.Leader == email && row.Status == "Upcoming") {
            return h(
              NButton,
              {
                // color: "rgb(183, 20, 20)",
                color: "red",
                size: "small",
                onClick: () => {
                  meetingDetails.then((QuerySnapshot) => {
                    QuerySnapshot.forEach((docs) => {
                      let yy = docs.data();
                      if (row.Name == yy.Name && yy.Status != "Cancelled") {
                        let boo = confirm(
                          "Confirm on cancelling " + row.Name + "?"
                        );
                        if (boo == true) {
                          updateDoc(doc(db, "Meetings", docs.id), {
                            Status: "Cancelled",
                          }).then((user) => {
                            console.log(user);
                            location.reload();
                          });
                        }
                      } else if (row.Name == yy.Name) {
                        alert("The meeting has already been cancelled.");
                      }
                    })
                  })
                },
              },
              { default: () => "Cancel Meeting" }
            );
            }
          },
        },
      ];
    };
    
  },
  methods: {
    typeOf(obj) {
      return {}.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
    },
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
      rowClassName(row) {
        if (row.Status == "Cancelled") {
          return "Cancelled";
        } else if (row.Status == "Completed") {
          return "Completed";
        }
      },
    };
  },
});
</script>

<style scoped>
:deep(.Cancelled td) {
  color: rgb(183, 20, 20);
}

:deep(.Completed td) {
  color: rgba(73, 202, 13, 0.991);
}
</style>