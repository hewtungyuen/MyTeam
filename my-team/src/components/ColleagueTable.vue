<template>
<div id = "body">
  <h2 id = "heading"> Colleague Search Page </h2>
  <n-input
            type="text"
            round
            placeholder="Enter Name"
            size="large"
            v-model:value="ColleagueName"
            autosize
            style="min-width: 80%"
            clearable
          />
  <n-button strong
            secondary
            round
            type="success" @click = "searchColleague()" id = "searchBut"> Search </n-button><br><br>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="sortName">Sort By Name (Ascend)</n-button>
      <n-button @click="clearSorter">Clear Sorter</n-button>
      <n-button @click = "clearSearch">Clear Search</n-button>
    </n-space>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="this.content"
      :pagination="pagination"
    />
  </n-space>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import firebaseApp from '../firebase.js';
import {getFirestore} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
const db = getFirestore(firebaseApp);

const columns = [
  {
    title: 'Name',
    key: 'name',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Email',
    key: 'email',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Position',
    key: 'position',
    defaultSortOrder: 'ascend',
    sorter: 'default'
  },
  {
    title: 'Mobile Number',
    key: 'mobile',
  }
]



export default defineComponent({
  setup () {
    const tableRef = ref(null)
    return {
      table: tableRef,
      columns,
      pagination: ref({ pageSize: 10 }),
      sortName () {
        tableRef.value.sort('name', 'ascend')
      },
      clearSorter () {
        tableRef.value.sort(null)
      }
    }
  },

  data() {
      return {
          content: [],
          ColleagueName:""
      }
  },
  mounted() {
      let rowkey = 0
      getDocs(collection(db,"Users")).then((collect) =>
      collect.forEach((doc) => {
          let yy = doc.data()
          this.content.push({
              key:rowkey,
              name: yy.FullName,
              email: yy.Email,
              position: yy.Position,
              mobile: yy.Mobile
          })
          rowkey += 1
      }))
      },
  methods: {
    async searchColleague() {
      let name = this.ColleagueName
      this.ColleagueName = ""
      this.content = []
      let rowkey = 0
      let collect = await getDocs(collection(db,"Users"))
      collect.forEach((doc) => {
          let yy = doc.data()
          let check = yy.FullName.toLowerCase().includes(name.toLowerCase())
          if (check) {
          this.content.push({
              key:rowkey,
              name: yy.FullName,
              email: yy.Email,
              position: yy.Position,
              mobile: yy.Mobile
          })
          rowkey += 1
          }
      })
    },

    async clearSearch() {
      let rowkey = 0
      this.content = []
      let collect = await getDocs(collection(db,"Users"))
      collect.forEach((doc) => {
          let yy = doc.data()
          this.content.push({
              key:rowkey,
              name: yy.FullName,
              email: yy.Email,
              position: yy.Position,
              mobile: yy.Mobile
          })
          rowkey += 1
      })
    }

  }
      
})
</script>
<style scoped>
#body{
  margin:5%;
  margin-top:3%
}
#heading {
  position:relative;
  left: 35%
}
#searchBut {
  margin: 10px;
  position: relative;
  top: 5px
}
</style>