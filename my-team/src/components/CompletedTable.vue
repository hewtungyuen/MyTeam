<template>
  <n-space vertical :size="12">
    <n-data-table
      ref="table"
      :columns="this.$store.state.column"
      :data="this.$store.state.data"
      :pagination="pagination"
      :row-class-name="rowClassName"
    />
  </n-space>
</template>

<script>
import { h, defineComponent, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { NText } from "naive-ui";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);




export default defineComponent({
  data() {
    return {
      user: false,
      output: []
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
          type: 'expand',
          expandable: (row) => row.TaskName,  
          renderExpand: (row) => {
            return row.Description
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
        }
      ];
    };

    this.$store.commit("updateColumn", createColumns());


    taskDetails.then((QuerySnapshot) => {
      const z = [];
      QuerySnapshot.forEach((doc) => {
        let yy = doc.data();
        if (
          yy.ProjectID == this.$route.params.id &&
          yy.CompletionStatus == "Completed"
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
    };
  },
});
</script>