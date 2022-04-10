<template>
  <Sidebar />
  <Header :title="title" />

  <div class="buttons">
    <div class="grid-container" v-if="user.email == leader">
      <div class="grid-item"><AddMember @addedMem="change" /></div>
      <div class="grid-item">
        <n-button @click="goToMemberStatistics()">Member Statistic</n-button>
      </div>
      <div class="grid-item">
        <AddTask @addedTask="change2" :key="refreshComp" />
      </div>
      <div class="grid-item">
        <AddAMeeting @addedMeeting="change2" :key="refreshComp" />
      </div>
    </div>
  </div>

  <div class="projLabel">
    <ProjectLabel :key="refreshComp" />
  </div>
  <div class="table">
    <ProjectToggleBar :key="refresh2" />
  </div>
  <CompleteProj class="completebtn" />
</template>

<script>
import ProjectLabel from "@/components/ProjectLabel.vue";
import ProjectToggleBar from "@/components/ProjectToggleBar.vue";
import Sidebar from "@/components/sidebar/Sidebar";
import AddMember from "@/components/AddMember.vue";
import AddTask from "@/components/AddTask.vue";
import AddAMeeting from "@/components/AddAMeeting.vue";
import { sidebarWidth } from "@/components/sidebar/state";
import CompleteProj from "@/components/CompleteProj";
import Header from "@/components/Header.vue";
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "ProjectPage",

  components: {
    ProjectLabel,
    ProjectToggleBar,
    Sidebar,
    AddTask,
    AddMember,
    AddAMeeting,
    CompleteProj,
    Header,
  },

  setup() {
    return { sidebarWidth };
  },
  data() {
    return {
      refreshComp: 0,
      refresh2: 0,
      title: "",
      user: "",
      leader: "",
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
      console.log("refreshComp is" + this.refreshComp);
    },
    change2() {
      this.refresh2 += 1;
    },
    goToMemberStatistics() {
      var projectId = this.$route.params.id;
      this.$router.push("/MemberStatistics/" + projectId);
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });

    const fetchData = async () => {
      let projectDetails = getDocs(collection(db, "Projects"));
      projectDetails.then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          if (doc.id == this.$route.params.id) {
            let yy = doc.data();
            this.title = yy.Name;
            this.leader = yy.Leader;
          }
        });
      });
    };
    fetchData();
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 45% 40%;
}
.grid-item {
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* padding: 20px; */
  font-size: 30px;
  text-align: center;
  width: 50px;
}
.buttons {
  text-align: center;
  float: right;
  width: 380px;
  height: 150px;
  margin-right: 10px;
  margin-top: 20px;
  /* background-color: #2196F3; */
  /* padding: 10px; */
  display: inline-block;
}
.projLabel {
  float: left;
  /* background-color:red; */
  display: inline-block;
  margin-left: 20px;
  margin-top: 10px;
  max-width: 55%;
}

.completebtn {
  display: inline-block;
  margin-right: 60px;
  margin-top: 30px;
  margin-bottom: 30px;
  float: right;
}

.table {
  width: 90%;
  text-align: center;
  margin-left: 50px;
  padding: 10px;
  /* margin-top:50px; */
  display: inline-block;
}
</style>
