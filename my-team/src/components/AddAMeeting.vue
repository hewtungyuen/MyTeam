<template>
  <Sidebar />
  <h1 id="heading">Create a New Meeting</h1>
  <button id="back" @click="backHome()">&#8249; Home</button>
  <div id="body" v-if="user">
    <div id="meeting_details">
      <form>
        <label>Meeting Name:</label><br />
        <n-input
          type="text"
          v-model:value="name"
          size="large"
          clearable
        /><br /><br />
        <label>Meeting Details:</label><br />
        <n-input
          round
          type="textarea"
          v-model:value="details"
          size="large"
          rows="4"
          clearable
        />
        <br /><br />
        <label class="label" for="datetime">Date and Time: </label> <br />
        <n-input
          type="datetime-local"
          v-model:value="datetime"
          size="large"
          placeholder=""
          clearable
        /><br /><br />
      </form>
    </div>
    <div id="add_member">
      <form id="addMemForm">
        <label class="label" for="add">Add New Members: </label> <br />
        <n-input
          round
          type="text"
          id="add"
          placeholder="Enter Email"
          size="large"
          v-model:value="member"
        />
        <button id="addBut" type="button" @click="addMember()">+</button>
        <br /><br />
        <label class="label">Team Members: </label> <br />
        <div id="members"></div>
      </form>
    </div>
  </div>
  <button id="create" round @click="createMeeting()">Create &raquo;</button>
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
import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";

const db = getFirestore(firebaseApp);
export default {
  name: "AddAMeeting",
  components: {
    Sidebar,
  },
  data() {
    return {
      user: false,
      name: "",
      details: "",
      datetime: "",
      member: "",
      memberTotal: new Array(),
    };
  },

  setup() {
    return {
      sidebarWidth,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log("Current user email: " + this.user.email);
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

        // Add a button in list
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
          console.log("New length: " + this.memberTotal.length);

          // Deleting the element in the team member box
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

    // Create a meeting and push to database
    async createMeeting() {
      var meetingName = this.name;
      var meetingDetails = this.details;
      this.memberTotal.push(this.user.email);
      var meetingMembers = this.memberTotal;
      var leader = String(this.user.email);
      var datetime = this.datetime;
      alert("Create Meeting: " + meetingName);
      try {
        const docRef = await addDoc(collection(db, "Meetings"), {
          Name: meetingName,
          Details: meetingDetails,
          Leader: leader,
          StartDate: new Date().toLocaleDateString(),
          Members: meetingMembers,
          DateTime: datetime,
          CompletionStatus: "In Progress",
        });
        console.log("DocRef id: " + docRef.id);
        var meetingid = docRef.id;

        // Add this meeting into each member's ongoing Meetings
        for (let i = 0; i < meetingMembers.length; i++) {
          if (i == 0) {
            console.log("Added into Members ongoing meetings list");
          }
          await updateDoc(doc(db, "Users", meetingMembers[i]), {
            OngoingMeetings: arrayUnion(meetingid),
          });
        }
      } catch (error) {
        console.error("Error adding document:", error);
      }
      // this.$router.push("/ProjectPage");
    },
  },
};
</script>

<style scoped>
.label {
  font-size: 20px;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

#add {
  width: 350px;
}
#body {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  /* background-color: grey; */
  border: 1px solid black;
  padding: 12px;
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
#meeting_details {
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