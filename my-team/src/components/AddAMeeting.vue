<template>
<Sidebar/>
  <h1 id="heading">Create a New Meeting</h1>
  <button id="back" @click="backHome()">&#8249; Home</button>
  <div id="body" v-if="user">
    <div id="proj_name">
      <form>
        <label class ="label" for="name">Meeting Title: </label> <br />
        <input type="text" id="name" required="" size="30" v-model="name" />
        <br /> <br/>
        <label class ="label" for="datetime">Date and Time: </label> <br />
        <input type="datetime-local" id="datetime" required="" size="30" v-model="datetime" />
        <br /> <br/>
        <label class ="label" for="details">Meeting Details: </label> <br />
        <textarea
          id="details"
          name="details"
          rows="6"
          cols="40"
          v-model="details"
        ></textarea>        
      </form>
    </div>
    <div id="add_member">
      <form id="addMemForm">
        <label class ="label" for="add">Add New Members: </label> <br />
        <input
          type="text"
          id="add"
          required=""
          placeholder="Enter Email"
          size="20"
          v-model="member"
        />
        <button id="addBut" type="button" @click="addMember()">+</button>
        <br /><br />
        <label class ="label">Team Members: </label> <br />
        <div id="members"></div>
      </form>
    </div>
  </div>
  <button id="create" round @click="createProj()">Create &raquo;</button>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'

const db = getFirestore(firebaseApp);
export default {
  name: "AddAMeeting",
  components:{
        Sidebar,
    },
  data() {
    return {
      user: false,
      name: "",
      details: "",
      member: "",
      memberTotal: new Array(),
      datetime: "",
    };
  },
  setup() {
        return {sidebarWidth}
    },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(this.user.email);
      }
    });
  },
  methods: {
    backHome() {
      this.$router.push("/HomePage");
    },
    deleteMember(array, email) {
      confirm("Going to delete this member!");
      const index = array.indexOf(email);
      array.splice(index, 1);
      this.memberTotal = array;
      let elem = document.getElementById(email);
      elem.remove();
    },
    async addMember() {
      let z = await getDoc(doc(db, "Users", this.member));
      if (z.exists()) {
        let yy = z.data();
        console.log(yy);
        this.memberTotal.push(String(yy.Email));
        console.log(this.memberTotal.length);
        var bu = document.createElement("button");
        bu.type = "button";
        bu.className = "memberBut";
        bu.id = String(yy.Email);
        bu.innerHTML = yy.FullName + "&#x2715";
        let email = String(yy.Email);
        let array = this.memberTotal;
        bu.onclick = function () {
          confirm("Going to delete this member!");
          const index = array.indexOf(email);
          array.splice(index, 1);
          this.memberTotal = array;
          console.log(this.memberTotal.length);
          let elem = document.getElementById(email);
          elem.remove();
        };

        let memberTable = document.getElementById("members");
        memberTable.appendChild(bu);
      } else {
        alert("User does not exist!");
      }
      document.getElementById("addMemForm").reset();
    },
    async createProj() {
      var projname = this.name;
      var projdetails = this.details;
      var projmembers = this.memberTotal;
      var projleader = String(this.user.email);
      alert("Create Project: " + projname);
      try {
        const docRef = await addDoc(collection(db, "Projects"), {
          Name: projname,
          Details: projdetails,
          Leader: projleader,
          StartDate: new Date().toLocaleDateString(),
          Members: projmembers,
          Tasks: new Array(),
          CompletionStatus: "In Progress",
        });
        console.log(docRef.id);
        var projid = docRef.id;
        const leaderRef = doc(db, "Users", projleader);
        await updateDoc(leaderRef, {
          LeadingProjects: arrayUnion(projid),
        });
        for (let i = 0; i < projmembers.length; i++) {
          await updateDoc(doc(db, "Users", projmembers[i]), {
            Projects: arrayUnion(projid),
          });
        }
      } catch (error) {
        console.error("Error adding document:", error);
      }
      this.$router.push("/ProjectPage");
    },
  },
};
</script>

<style scoped>
.label {
    font-size: 20px;
}

#body {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  /* background-color: grey; */
  border: 1px solid black;
  padding:12px;
  position: absolute;
  width: 70%;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#heading {
  /* position: absolute; */
  margin-top: 25px;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-color: green;
}

#back {
  position: absolute;
  top: 50px;
  font-size: 18px;
  display: inline-block;
}
#proj_name {
  margin-top: 15px;
  /* background-color: red; */
  height: 100%;
  float: left;
  width: 47%;
}
#add_member {
  margin-top: 15px;
  /* background-color: bisque; */
  float: right;
  width: 47%;
  height: 100%;
}

form {
  font-size: 20px;
}
input,
textarea {
  border: 1px solid black;
  font-size: 18px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
#addBut {
  border-radius: 10px;
  font-size: 20px;
  position: relative;
  margin-left: 10px;
}
#create {
  position: absolute;
  top: 83%;
  left: 85%;
  font-size: 18px;
  display: inline-block;
}
#create:hover,
#back:hover {
  color: black;
}
#members {
border: 1px solid black;
  height: 150px;
  width: 350px;
}
.memberBut {
  margin: 10px;
  font-size: 16px;
}
</style>