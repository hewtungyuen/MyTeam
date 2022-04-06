<template>
  <n-input
            type="text"
            round
            placeholder="Enter In Charge name"
            size="large"
            v-model:value="searchEmail"
            autosize
            style="min-width: 80%"
            clearable
          />
  <n-button strong
            secondary
            round
            type="success" @click = "searchInCharge()" id = "searchBut"> Search </n-button>
  <n-button strong
            secondary
            round
            type="success" @click = "clearSearch()" id = "searchBut">Clear Search </n-button><br><br>
  <n-space vertical :size="12">
    <n-data-table
      ref="table"
      :columns="this.$store.state.column"
      :data="this.data"
      :pagination="pagination"
    />
  </n-space>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);




export default defineComponent({
  data() {
    return {
      user: false,
      data: [],
      searchEmail: ""
    };
  },
  methods: {
    async searchInCharge() {
      let name = this.searchEmail
      this.data = []
      let collect = await getDocs(collection(db, "Tasks"))

      collect.forEach((doc) => {
        let yy = doc.data()
        if (yy.ProjectID == this.$route.params.id &&
          yy.CompletionStatus == "Completed") {
          let check = yy.InCharge.toLowerCase().includes(name.toLowerCase())
          if (check) {
            this.data.push(yy)
          }
        }
      })

    },
    async clearSearch() {
      this.name = ""
      this.data = []
      let collect = await getDocs(collection(db, "Tasks"))

      collect.forEach((doc) => {
        let yy = doc.data()
        if (yy.ProjectID == this.$route.params.id && yy.CompletionStatus == "Completed") {
          this.data.push(yy)
        }
      })
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
          type: 'expand',
          expandable: (row) => row.TaskName,  
          renderExpand: (row) => {
            return row.Description
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
          this.data = this.$store.state.data;
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

<style scoped>
  #searchBut {
    margin: 10px;
    position: relative;
    top: 8px
  }
</style>