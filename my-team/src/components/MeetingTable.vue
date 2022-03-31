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
      :data="this.data"
      :pagination="pagination"
      :key="componentKey"
    />
  </n-space>
</template>

<script>
import { h, defineComponent, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs} from "firebase/firestore";
const db = getFirestore(firebaseApp);


export default defineComponent({
  data() {
    return {
      user: false,
      componentKey: 0,
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

    var taskDetails = getDocs(collection(db, "Meetings"));
    this.$store.commit("refreshData");

    // Update all the meetings into the store
    taskDetails.then((QuerySnapshot) => {
      const z = [];
      QuerySnapshot.forEach((doc) => {
        let yy = doc.data();
        
          z.push(yy);
          this.$store.commit("updateData", z);
          this.data = this.$store.state.data;
          console.log(yy);
      });
    });

   

    const createColumns = () => {
      return [
        {
          title: "Meeting Name",
          key: "Name",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "In Charge",
          key: "Leader",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "DateTime",
          key: "DateTime",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "Members Involved",
          key: "Members",
          defaultSortOrder: "ascend",
          sorter: "default",
        },
        {
          title: "Status",
          key: "Status",
          render () {
            return h(
              { default: () => 'Update Progress (10%)'}
            )
          }
        },
      ];
    };
    this.column = createColumns();
    
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