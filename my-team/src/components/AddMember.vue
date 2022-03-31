<template>
<div v-if = "leader">
  </div>
  <n-button id="modalBut" @click="show()">
    + Member
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Add New Members"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <form>
          <label>Add New Members: </label> <br />
          <n-input
            type="text"
            id="emailInput"
            round
            placeholder="Enter Email"
            size="large"
            v-model:value="member"
            autosize
            style="min-width: 80%"
            clearable
          />
          <n-button
            strong
            secondary
            round
            type="success"
            id="addBut"
            @click="addMember()"
          >
            +
          </n-button>
          <br /><br />
          <label>Team Members: </label> <br />
          <div id="members"></div>
        </form>
        <n-button strong secondary round type = "success" id = "addMemBut" @click = "confirmAdd()"> Add &raquo; </n-button>
    </n-card>
  </n-modal>

</template>

<script>
import firebaseApp from '../firebase.js';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {doc, getDoc,updateDoc,arrayUnion} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
  data(){
        return {
            user:false,
            projid: this.$store.state.projectID,
            member:"",
            showModal:false,
            leader:false,
            memberTotal: new Array(),
        }
  },
  mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                this.user = user;
                console.log(this.user.email)
                console.log(this.projid)
                checkleader(this.user.email, this.projid).then((x)=>{this.leader = x})
            }
        })
        async function checkleader(user, projid) {
        let z = await getDoc(doc(db, "Projects", projid));
        let leaderemail = String(z.data().Leader)
        console.log("leader of this proj" + leaderemail)
        return (leaderemail == user)
    }
  },
  methods: {
    show() {
      this.member = ""
      this.showModal = true
    },
    async addMember(){
            let z = await getDoc(doc(db, "Users", this.member));
            this.member = ""
            if (z.exists()) {
            let yy = z.data()
            let existing = await getDoc(doc(db,"Projects", this.projid))
            if (existing.data().Members.includes(yy.Email)){
              alert("You have already added this member!")
            }else{
            if(this.user.email == yy.Email){
                alert("You cannot add yourself!")
            }else{
              if(this.memberTotal.includes(yy.Email)) {
                alert("You have already added this member!")
                return
              }
            this.memberTotal.push(String(yy.Email))
            var bu = document.createElement("button")
            bu.type = "button"
            bu.className = "memberBut"
            bu.id = String(yy.Email)
            bu.style = "margin:10px; font-size:120%"
            bu.innerHTML = yy.FullName + " &#x2715"
            let email = String(yy.Email)
            let array = this.memberTotal
            bu.onclick = function() {
                let check = confirm("Going to delete this member!")
                if (check == true){
                const index = array.indexOf(email)
                array.splice(index, 1)
                this.memberTotal = array
                console.log(this.memberTotal.length)
                let elem = document.getElementById(email)
                elem.remove()
            }}
            
        let memberTable = document.getElementById("members")
        memberTable.appendChild(bu)
        }}} else {
            alert("User does not exist!")
        }
        },
    async confirmAdd(){
      var projmembers = this.memberTotal;
      const projRef = doc(db, "Projects", this.projid)
          await updateDoc(projRef, {
              Members: arrayUnion(...projmembers)
              });
      for (const mem of projmembers) {
        await updateDoc(doc(db,"Users", mem), {
                        Projects: arrayUnion(this.projid)
                    })
      }
      alert("Members added successfully!")

    }
    }
  }
</script>

<style>
#members {
  height: 150px;
  background-color: rgb(165, 233, 210);
}
#modalBut {
  position: absolute;
  top:60px;
  right: 180px
}
</style>