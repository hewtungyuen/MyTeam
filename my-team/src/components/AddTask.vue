<template>
  <n-button id="modalBut" @click="show()" v-if = "leader">
    + Task
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Add A Task"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <form id = "addTaskForm">
        <label>Task Name:</label><br>
        <n-input type = "text" v-model:value = "name" size = "large" clearable/><br><br>
        <label>Task Description:</label><br>
        <n-input round type = "textarea" v-model:value = "description" size = "large" rows = "4" clearable /> <br><br>
        <label>In Charge:</label><br>
        <n-input type="text" placeholder="Enter Email" size = "large" v-model:value = "incharge"/><br><br>
        <label>Deadline:</label>
        <n-date-picker v-model:value="ddl" type="date" clearable /><br>
        <label>Expected Hours: </label>
        <n-input-number v-model:value="hours" clearable />
    </form>
    <n-button strong secondary round type = "success" id = "addTaskBut" @click = "addTask()"> Add &raquo; </n-button>
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, ref } from "vue";
import firebaseApp from '../firebase.js';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {doc, getDoc,collection,addDoc, updateDoc,arrayUnion} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default defineComponent({
  setup() {
    return {
      showModal: ref(false)
    };
  },
  data(){
        return {
            user:false,
            leader:false,
            name:"",
            description:"",
            incharge:"",
            ddl: null,
            hours:"",
            projid: this.$store.state.projectID
        }
  },
  mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                this.user = user;
                console.log(this.user.email)
                console.log(this.projid)
                this.leader = checkleader(this.user.email, this.projid)
            }
        })
        async function checkleader(user, projid) {
        let z = await getDoc(doc(db, "Users", user));
        let leadingproj = z.data().LeadingProjects
        return leadingproj.includes(projid)
    }
    },
    methods: {
    show() {
        this.showModal = true
        document.getElementById("addTaskForm").reset();
    },
    async addTask(){
      var name = this.name;
      var desc = this.description;
      var incharge = this.incharge;
      var ddl = this.ddl;
      var hours = this.hours;
      if (name == "" || incharge == "" || ddl == null || hours == ""){
        alert("Please input all fields!")
      } else{
      let z = await getDoc(doc(db, "Users", incharge));
      if (z.exists()) {
        var yy = z.data()
        console.log(yy)
        try{
          const docRef = await addDoc(collection(db, "Tasks"), {
            ProjectID: this.projid,
            TaskName:name,
            Description: desc,
            InCharge: incharge,
            DeadLine: ddl,
            ExpectedHours: hours,
            ProgressStatus:"0",
            CompletionStatus: "In Progress"
          })
          console.log(docRef)
          var taskid = docRef.id
          const projRef = doc(db, "Projects", this.projid)
          await updateDoc(projRef, {
              Tasks: arrayUnion(taskid)
              });
          document.getElementById("addTaskForm").reset();
          alert("Task added successfully!")
          this.showModal = false

        }catch(error){
                console.error("Error adding document:", error);
            }
    }else {
      alert("User does not exist!")
    }
      }
  }
  }
});
</script>

<style scoped>
#addTaskBut{
  margin-top:10px;
  float:right;
}
#modalBut{
    position:absolute;
    top: 60px;
    right: 60px
}
</style>