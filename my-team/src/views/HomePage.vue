<template>
  <div>
    <Header :title="title" />

    <div id="body">
      <Sidebar />

      <h2 id="welcome">Welcome, {{ name }}</h2>

      <!-- grid 1 -->
      <div class="grid1">
        <div class="projectsTableAndButton">
          <div class="grid2">
            <h2 class="projectsHeading" id="myTasksTitle">My Projects</h2>
            <n-button
              id="addProjectButton"
              class="projectsHeading"
              strong
              secondary
              round
              @click="addNewProject()"
              style="margin-top: 15px; max-width: 90%"
            >
              Create a new project +
            </n-button>
          </div>
          <div
            class="projects"
            style="overflow: auto; padding: 2%; max-height: 88%"
          >
            <n-divider />
            <div v-if="this.projectNames.length === 0">
              <h2>You have no projects at the moment.</h2>
            </div>
            <n-collapse v-else-if="this.projectNames.length === 1">
              <n-collapse-item :title="projectNames[0]">
                <div v-if="this.myCurrentTasks[index - 1].length == 0">
                  <i>You have no pending tasks at the moment. </i>
                </div>

                <div v-else>
                  <ProjectsTable :tasksToDisplay="this.myCurrentTasks[0]" />
                </div>

                <template #header-extra>
                  <button
                    @click="
                      goToProjectsPage(this.projectIdsWithoutCompleted[0])
                    "
                  >
                    Go to project
                  </button>
                </template> </n-collapse-item
              ><n-divider />
            </n-collapse>

            <n-collapse
              v-else
              v-for="index in this.projectNames.length"
              :key="index"
            >
              <n-collapse-item :title="projectNames[index - 1]">
                <div v-if="this.myCurrentTasks[index - 1].length == 0">
                  <i>You have no pending tasks at the moment. </i>
                </div>

                <div v-else>
                  <ProjectsTable
                    :tasksToDisplay="this.myCurrentTasks[index - 1]"
                    :empty="this.myCurrentTasks.length == 0"
                  />
                </div>
                <template #header-extra>
                  <n-button
                    @click="
                      goToProjectsPage(
                        this.projectIdsWithoutCompleted[index - 1]
                      )
                    "
                  >
                    Go to project
                  </n-button>
                </template>
              </n-collapse-item>
              <n-divider />
            </n-collapse>
          </div>
        </div>

        <div class="tasks">
          <h2>Upcoming Tasks</h2>
          <div class="meetingsAndDeadlines">
            <div v-if="allMyTasks.length == 0">
              <i v-if="allMyTasks.length == 0">You have no upcoming tasks.</i>
            </div>
            <div v-else v-for="subTask in allMyTasks" :key="subTask.ProjectID">
              <DeadlinesAndMeetings
                :title="subTask.TaskName"
                :date="subTask.DeadLine"
                type="Deadline"
                :projectId="subTask.ProjectID"
                :progressStatus="subTask.ProgressStatus"
              />
            </div>
          </div>
        </div>

        <div class="meetings">
          <h2>Upcoming Meetings</h2>
          <div class="meetingsAndDeadlines" id="deadlines">
            <div v-if="allMyMeetingDetails.length == 0">
              <i>You have no upcoming meetings.</i>
            </div>
            <div
              :native-scrollbar="false"
              bordered
              v-else
              v-for="meeting in allMyMeetingDetails"
              :key="meeting.title"
            >
              <DeadlinesAndMeetings
                :title="meeting.Name"
                :date="new Date(meeting.DateTime)"
                type="Meeting"
                :projectId="meeting.ProjectID"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- grid 1 -->

      <br />

      <!-- grid 2 -->

      <!-- <HomeChart
        :projectNames="this.projectNames"
        :key="this.projectNames[0]"
        :allMyTasks="this.allMyTasks"
        style="padding-left: 15px"
      /> -->
    </div>
  </div>
</template>

<script>
import DeadlinesAndMeetings from "@/components/DeadlinesAndMeetings.vue";
import ProjectsTable from "@/components/ProjectsTable.vue";
import Header from "@/components/Header.vue";
// import HomeChart from "@/components/HomeChart.vue";
import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebase.js";

// import { collection, getDocs, getFirestore} from 'firebase/firestore'
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";

var db = getFirestore(firebaseApp);

export default {
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });

    var allUsers = getDocs(collection(db, "Users"));
    var allProjects = getDocs(collection(db, "Projects"));
    var allTasks = getDocs(collection(db, "Tasks"));
    var allMeetings = getDocs(collection(db, "Meetings"));

    // var myProjects = []

    // const func = async () => {
    //   allUsers.then((querySnapshot) => {
    //     var myProjects = [];
    //     querySnapshot.forEach((d) => {
    //       var docData = d.data();
    //       if (d.data().Email == this.user.email) {
    //         if (docData.Projects) {
    //           myProjects.concat(docData.Projects);
    //         }
    //         if (docData.LeadingProjects) {
    //           myProjects = myProjects.concat(docData.LeadingProjects);
    //         }
    //       }
    //     });
    //   })
    // }


    // allUsers.then((querySnapshot) => {
    //   var myProjects = [];
    //   querySnapshot.forEach((d) => {
    //     var docData = d.data();
    //     if (d.data().Email == this.user.email) {
    //       if (docData.Projects) {
    //         myProjects.concat(docData.Projects);
    //       }
    //       if (docData.LeadingProjects) {
    //         myProjects = myProjects.concat(docData.LeadingProjects);
    //       }
    //     }
    //   });
    //   allProjects.then((querySnapshot) => {
    //     var completedList = []
    //     var ongoingList = []
    //     var overdueList = []

    //     myProjects.forEach((projId) => {
    //       // allProjects.then((querySnapshot) => {
    //       querySnapshot.forEach((d) => {
    //         if (d.id == projId) {
    //           var docData = d.data();

    //           if (docData.CompletionStatus == "In Progress") {
    //             // if project is still in progress

    //             allTasks.then((querySnapshot) => {
    //               var completed = 0;
    //               var ongoing = 0;
    //               var overdue = 0;
    //               var count = 0;
    //               docData.Tasks.forEach(() => {
    //                 // for each taskId in the projects that i am in
    //                 count += 1;
    //                 querySnapshot.forEach((d) => {
    //                   var docData = d.data();

    //                   if (docData.InCharge == this.user.email) {
    //                     // this is my task
    //                     console.log(docData.CompletionStatus);
    //                     if (docData.CompletionStatus == "Completed") {
    //                       completed += docData.ExpectedHours;
    //                     }

    //                     if (docData.CompletionStatus == "In Progress") {
    //                       console.log("here");
    //                       if (new Date(docData.DeadLine) < new Date()) {
    //                         overdue += docData.ExpectedHours;
    //                       } else {
    //                         ongoing +=
    //                           docData.ExpectedHours -
    //                           docData.ExpectedHours *
    //                             (docData.ProgressStatus / 100);
    //                       }
    //                     }
    //                   }
    //                 });
    //               });
    //               completedList.push(completed / count);
    //               ongoingList.push(ongoing / count);
    //               overdueList.push(overdue / count);
    //             });
    //           }
    //         }
    //       });
    //       // });
    //     });

    //     console.log(completedList)
    //     console.log(ongoingList)
    //     console.log(overdueList)
    //   });
    // });

    allUsers.then((querySnapshot) => {
      var myProjects = [];

      querySnapshot.forEach((d) => {
        var docData = d.data();
        if (docData.Email == this.user.email) {
          this.name = docData.FullName;
          if (docData.Projects) {
            myProjects = myProjects.concat(docData.Projects);
          }

          if (docData.LeadingProjects) {
            myProjects = myProjects.concat(docData.LeadingProjects);
          }

          if (docData.OngoingMeetings) {
            allMeetings.then((querySnapshot) => {
              querySnapshot.forEach((meetingDoc) => {
                var meetingData = meetingDoc.data();
                var ProjectID = meetingData.ProjectID;

                allProjects.then((querySnapshot) => {
                  querySnapshot.forEach((d) => {
                    if (
                      d.id == ProjectID &&
                      d.data().CompletionStatus == "In Progress"
                    ) {
                      // console.log(meetingData.DateTime)

                      // let day = meetingData.DateTime.slice(0,3)
                      let month = meetingData.DateTime.slice(4, 7);
                      let date = meetingData.DateTime.slice(8, 10);
                      let year = meetingData.DateTime.slice(11, 15);
                      let hour = meetingData.DateTime.slice(17, 19);
                      let minute = meetingData.DateTime.slice(20, 22);

                      // console.log(day)
                      // console.log(month)
                      // console.log(date)
                      // console.log(year)
                      // console.log(hour)
                      // console.log(minute)

                      const months = {
                        Jan: "01",
                        Feb: "02",
                        Mar: "03",
                        Apr: "04",
                        May: "05",
                        Jun: "06",
                        Jul: "07",
                        Aug: "08",
                        Sep: "09",
                        Oct: "10",
                        Nov: "11",
                        Dec: "12",
                      };

                      let DateTime = new Date(
                        year,
                        months[month] - 1,
                        date,
                        hour,
                        minute
                      );
                      // console.log(DateTime)

                      if (
                        DateTime >= new Date() &&
                        meetingData.Status != "Cancelled"
                      ) {
                        let Name = meetingData.Name;
                        let obj = {
                          DateTime: DateTime,
                          ProjectID: ProjectID,
                          Name: Name,
                        };
                        this.allMyMeetingDetails.push(obj);
                      } else if (
                        DateTime <= new Date() &&
                        meetingData.Status == "Upcoming"
                      ) {
                        updateDoc(doc(db, "Meetings", meetingDoc.id), {
                          Status: "Completed",
                        });
                      }
                    }
                  });
                  this.allMyMeetingDetails.sort((a, b) =>
                    a.DateTime > b.DateTime
                      ? 1
                      : b.DateTime > a.DateTime
                      ? -1
                      : 0
                  );
                });
              });
            });
          }
        }
      });

      this.projectIds = myProjects;

      this.projectIds.forEach((projId) => {
        allProjects.then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id == projId) {
              var projData = doc.data();
              if (projData.CompletionStatus == "In Progress") {
                this.projectIdsWithoutCompleted.push(doc.id);
                this.projectNames.push(projData.Name);
                // var overviewTask = {
                //   Name: projData.Name,
                //   "In Progress": 0,
                //   Completed: 0,
                //   Overdue: 0,
                // };
                // this.allMyTasks2.push(overviewTask);
                this.projectDeadlines.push(projData.StartDate);

                var intermediate = new Array();

                projData.Tasks.forEach((taskId) => {
                  allTasks.then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                      if (doc.id == taskId) {
                        if (
                          doc.data().InCharge == this.user.email &&
                          doc.data().CompletionStatus == "In Progress"
                        ) {
                          let taskData = doc.data();
                          let TaskName = taskData.TaskName;
                          let DeadLine = new Date(taskData.DeadLine);
                          let DeadLineString = new Date(
                            taskData.DeadLine
                          ).toDateString();
                          let ProjectID = taskData.ProjectID;
                          let ProgressStatus = taskData.ProgressStatus + '%';
                          let ExpectedHours = taskData.ExpectedHours;
                          let obj = {
                            TaskName: TaskName,
                            DeadLine: DeadLine,
                            ProjectID: ProjectID,
                            ProgressStatus: ProgressStatus,
                            DeadLineString: DeadLineString,
                            ExpectedHours: ExpectedHours,
                            ProjectName: projData.Name,
                          };

                          intermediate.push(obj);
                          this.allMyTasks.push(obj);
                        }
                      }
                    });
                    this.allMyTasks.sort((a, b) =>
                      a.DeadLine > b.DeadLine
                        ? 1
                        : b.DeadLine > a.DeadLine
                        ? -1
                        : 0
                    );
                  });
                });
                this.myCurrentTasks.push(intermediate);
              }
            }
          });
        });
      });
    });

    // console.log('here')
    // const target_copy = Object.assign([], this.projectNames);
    // console.log(target_copy)
    // console.log(this.projectNames)
    // console.log(this.allMyTasks)
    // console.log(this.projectNames);
  },
  data() {
    return {
      title: "Home Page",
      name: "",
      user: false,
      projectIds: [],
      projectIdsWithoutCompleted: [],
      projectNames: new Array(),
      projectDeadlines: [],
      myCurrentTasks: [], // 2d array, separated by project
      allMyTasks: [], // 1d array
      allMyMeetingDetails: [], // objects of meeting details
      allMyMeetings: [], // ids
      // allMyTasks2: [],
    };
  },
  name: "HomePage",
  components: {
    DeadlinesAndMeetings,
    ProjectsTable,
    Sidebar,
    // HomeChart,
    Header,
  },
  methods: {
    typeOf(obj) {
      return {}.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
    },
    addNewProject() {
      this.$router.push("/NewProjPage");
    },
    // update() {
    //     this.$store.commit('update', "387UsydZXmACIAU9WQMk");
    //     // console.log(this.$store.state.projectID);
    //     // console.log(this.$store.state.name);
    // },
    goToProjectsPage(projectId) {
      this.$store.commit("update", projectId);
      // console.log('here')
      // console.log(projectId)
      this.$router.push("/ProjectPage/" + projectId);
    },
    sortByDate() {
      this.allMyTasks.sort((a, b) =>
        a.ExpectedHours > b.ExpectedHours
          ? -1
          : b.ExpectedHours > a.ExpectedHours
          ? 1
          : 0
      );

      console.log(this.allMyTasks);
    },
  },
  setup() {
    return { sidebarWidth };
  },
};
</script>

<style scoped>
#body {
  max-width: 95%;
}

.meetings,
.tasks {
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 10%;
  background-color: rgb(196, 240, 221);
  max-height: 69%;
  overflow: auto;
}

#welcome {
  margin-left: 30px;
}

.grid1 {
  display: grid;
  grid-template-columns: 50% 25% 25%;
  padding: 30px;
  column-gap: 40px;
  padding-top: 0px;
  max-height: 500px; /* this one affects the homechaart */
}

.projectsTableAndButton {
  max-height: 69%;
}
.grid2 {
  display: grid;
  grid-template-columns: 50% 50%;
  padding-right: 30px;
  column-gap: 50px;
}
</style>
