<template>
  <n-button id="modalBut" @click="show()"> + Meeting </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Add A New Meeting"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <form id="addMemberForm">
        <label>Meeting Title:</label><br />
        <n-input
          type="text"
          v-model:value="name"
          size="large"
          required=""
          clearable
        /><br /><br />
        <label>Meeting Description:</label><br />
        <n-input
          round
          type="textarea"
          v-model:value="details"
          size="large"
          rows="4"
          required=""
          clearable
        />
        <br /><br />
        <label>Date and Time:</label>
        <n-input
          type="datetime-local"
          v-model:value="datetime"
          size="large"
          placeholder=""
          required=""
          clearable
        />
        <br /><br />
        <label class="label" for="add">Add New Members: </label>
        <div class="dropdown">
          <n-button class="primary" id="dropbtn">Add your members</n-button>
          <br />
          <div class="dropdown-content">
            <a
              @click="addMember(email)"
              v-for="email in membersInProject"
              :key="email.id"
              >{{ email }}
            </a>
          </div>
        </div>
        <br />
        <label class="label" for="add"
          >Total Number of Members: {{ memberInMeeting.length }}
        </label>

        <br />
        <div id="members"></div>
      </form>
      <n-button
        strong
        secondary
        round
        type="success"
        id="addMeetingBut"
        @click="createMeeting()"
      >
        Add &raquo;
      </n-button>
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, ref } from "vue";
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
export default defineComponent({
  name: "AddAMeeting",
  data() {
    return {
      user: false,
      name: "",
      details: "",
      datetime: "",
      memberInMeeting: new Array(),
      membersInProject: ["No Member in this project"],
      projId: this.$route.params.id,
    };
  },

  setup() {
    return {
      showModal: ref(false),
    };
  },
  watch: {
    showModal: function (newVal) {
      if (newVal == false) {
        this.resetData();
      }
    },
  },

  mounted() {
    // Get User information
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log("Current user email: " + this.user.email);
      }
    });
    console.log("Project Id: " + this.projId);

    // Get all the project members and put into membersInProject
    const docRef = doc(db, "Projects", this.projId);
    const docSnap = getDoc(docRef);
    docSnap.then((item) => {
      // console.log(item.data().Members);
      var n = item.data().Members;
      for (var i = 0; i < item.data().Members.length; i++) {
        if (n[i] === this.user.email) {
          n.splice(i, 1);
        }
      }
      this.membersInProject = n;
    });
  },
  methods: {
    resetData() {
      this.name = "";
      this.details = "";
      this.datetime = "";
      this.memberInMeeting = new Array();
    },

    show() {
      this.showModal = true;
      this.addMember(this.user.email);
      // document.getElementById("addMemberForm").reset();
    },
    unshow() {
      this.showModal = false;
    },
    typeOf(obj) {
      return {}.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
    },
    deleteMember(array, email) {
      let result = confirm("Going to delete this member!");
      if (result == true) {
        const index = array.indexOf(email);
        array.splice(index, 1);
        this.memberInMeeting = array;
        let elem = document.getElementById(email);
        elem.remove();
      }
    },

    async addMember(member) {
      let z = await getDoc(doc(db, "Users", member));
      if (z.exists()) {
        let yy = z.data();
        if (this.memberInMeeting.includes(member)) {
          alert("Member is already in the meeting");
        } else {
          this.memberInMeeting.push(String(yy.Email));
          console.log("Member added: " + member);

          // Add a button in list
          var bu = document.createElement("button");
          bu.type = "button";
          bu.className = "memberBut";
          bu.id = String(yy.Email);
          if (member === this.user.email) {
            bu.innerHTML = yy.FullName + " (Myself)";
          } else {
            bu.innerHTML = yy.FullName + "&#x2715";
            let email = String(yy.Email);
            let array = this.memberInMeeting;
            bu.onclick = function () {
              confirm("Going to delete this member!");
              const index = array.indexOf(email);
              array.splice(index, 1);
              this.memberInMeeting = array;
              console.log("New length: " + this.memberInMeeting.length);

              // Deleting the element in the team member box
              let elem = document.getElementById(email);
              elem.remove();
            };
          }

          let memberTable = document.getElementById("members");
          memberTable.appendChild(bu);
        }
      } else {
        alert("User does not exist!");
      }
    },

    // Create a meeting and push to database
    async createMeeting() {
      var meetingName = this.name;
      var meetingDetails = this.details;
      var meetingMembers = this.memberInMeeting;
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
          ProjectID: this.projId,
        });
        var meetingid = docRef.id;
        console.log("Meeting successfully created: " + docRef.id);
        // Add this meeting into each member's ongoing Meetings
        for (let i = 0; i < meetingMembers.length; i++) {
          if (i == 0) {
            console.log("Members ongoing meetings updated");
          }
          await updateDoc(doc(db, "Users", meetingMembers[i]), {
            OngoingMeetings: arrayUnion(meetingid),
          });
        }
        // Reset the data to preset
        this.resetData();

      } catch (error) {
        console.error("Error adding document:", error);
      }

      this.unshow();
    },
  },
});
</script>

<style scoped>
#modalBut {
  position: absolute;
  top: 18%;
  right: 60px;
}

/* Style The Dropdown Button */
.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

#add {
  width: 350px;
}

#heading {
  /* position: absolute; */
  margin-top: 25px;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-color: green;
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
  width: 450px;
}
.memberBut {
  margin: 10px;
  font-size: 16px;
}

#addMeetingBut {
  margin-top: 10px;
  float: right;
}
</style>