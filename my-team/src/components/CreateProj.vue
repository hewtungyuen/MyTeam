<template>
  <div id="body">
    <div>
      <n-button
        strong
        secondary
        round
        type="success"
        id="back"
        @click="backHome()"
      >
        &#8249; Home
      </n-button>
    </div>
    <div id="createAdd">
      <div id="left">
        <form>
          <label>Project Name:</label><br />
          <n-input
            round
            type="text"
            v-model:value="name"
            size="large"
            clearable
          /><br /><br />
          <label>Project Details:</label><br />
          <n-input
            round
            type="textarea"
            v-model:value="details"
            size="large"
            rows="5"
            clearable
          />
          <br /><br />
        </form>
      </div>
      <div id="right">
        <form id="addMemForm">
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
      </div>
      <n-button
        strong
        secondary
        round
        type="success"
        id="create"
        @click="createProj()"
      >
        Create &raquo;
      </n-button>
    </div>
  </div>
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
const db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      user: false,
      name: "",
      details: "",
      member: "",
      memberTotal: new Array(),
    };
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
    async addMember() {
      let z = await getDoc(doc(db, "Users", this.member));
      this.member = "";
      if (z.exists()) {
        let yy = z.data();
        console.log(yy);
        if (this.user.email == yy.Email) {
          alert("You cannot add yourself!");
        } else {
          if (this.memberTotal.includes(yy.Email)) {
            alert("You have already added this member!");
            return;
          }
          this.memberTotal.push(String(yy.Email));
          console.log(this.memberTotal.length);
          var bu = document.createElement("button");
          bu.type = "button";
          bu.className = "memberBut";
          bu.id = String(yy.Email);
          bu.style = "margin:10px; font-size:120%";
          bu.innerHTML = yy.FullName + " &#x2715";
          let email = String(yy.Email);
          let array = this.memberTotal;
          bu.onclick = function () {
            let check = confirm("Going to delete this member!");
            if (check == true) {
              const index = array.indexOf(email);
              array.splice(index, 1);
              this.memberTotal = array;
              console.log(this.memberTotal.length);
              let elem = document.getElementById(email);
              elem.remove();
            }
          };

          let memberTable = document.getElementById("members");
          memberTable.appendChild(bu);
        }
      } else {
        alert("User does not exist!");
      }
    },
    async createProj() {
      var projname = this.name;
      var projdetails = this.details;
      var projmembers = this.memberTotal;
      var projleader = String(this.user.email);
      if (projname == "") {
        alert("Please input a project name!");
      } else {
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
            CompletionDate: "",
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
        this.$router.push("/HomePage");
      }
    },
  },
};
</script>

<style scoped>
#body {
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 3%;
  background-color: white;
}
#createAdd {
  border: solid rgb(72, 134, 72) 1px;
  border-radius: 15px;
  margin-top: 30px;
  padding: 40px;
  padding-bottom: 40px;
}
#left {
  width: 45%;
  float: left;
}
#right {
  width: 45%;
  display: inline-block;
  float: left;
  margin-left: 40px;
}
#members {
  height: 150px;
  background-color: rgb(165, 233, 210);
}
#emailInput {
  position: relative;
  top: -5px;
}
#create {
  margin-top: 30px;
  left: 40%;
}
#addBut {
  font-size: 170%;
  margin-left: 5px;
  position: relative;
  top: 5px;
}
</style>
