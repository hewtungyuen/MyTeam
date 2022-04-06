<template>
  <!-- <Header :title = "title"/>  -->
  <n-card :bordered="false">
    <!-- <h1>{{ title }}</h1> -->
    Team Leader: {{ teamleader }}
    <br />
    Started on: {{ date }}
    <br />
    Team Members: {{ memberTotal }}
    <br />
    Details: {{ details }}
  </n-card>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// import Header from '@/components/Header.vue'

const db = getFirestore(firebaseApp);

export default {
  // components: {
  //   Header,
  // },
  
  data() {
    return {
      user: false,
      title: "",
      teamleader: "",
      date: "",
      details: "",
      memberTotal: "",
    };
  },
  methods: {
    async click() {
      let projectDetails = getDocs(collection(db, "Projects"));
      console.log("Click");
      projectDetails.then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          if (doc.id == this.$route.params.id) {
            console.log("Found the project in database");
            let yy = doc.data();
            this.teamleader = "(" + yy.Leader + ")";
            this.details = yy.Details;
            this.date = yy.StartDate;
            this.title = yy.Name;

            yy.Members.forEach((mem) => {
              this.memberTotal += "(" + mem + ") ";
            });
          }
        });
      });
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
      let userDetails = getDocs(collection(db, "Users"));

      projectDetails.then((QuerySnapshot) => {
      QuerySnapshot.forEach((doc) => {
        if (doc.id == this.$route.params.id) {
          console.log("Found the project in database");
          let yy = doc.data();
          userDetails.then((GetSnapShot) => {
            this.memberTotal += "(";
            GetSnapShot.forEach((item) => {
              let zz = item.data();
              if (zz.Email == yy.Leader) {
                this.teamleader = zz.FullName;
              }

              yy.Members.forEach((mem) => {
                if (zz.Email == mem) {
                  this.memberTotal += zz.FullName + ", ";
                }
              });
            })
            // console.log(this.memberTotal);
            this.memberTotal = this.memberTotal.slice(0,this.memberTotal.length-2);
            // console.log(this.memberTotal);
            this.memberTotal += ")";
          })

          //this.teamleader = "(" + yy.Leader + ")";
          this.details = yy.Details;
          this.date = yy.StartDate;
          this.title = yy.Name;

          // yy.Members.forEach((mem) => {
          //   this.memberTotal += "(" + mem + ") ";
          // });
        }
      });
    });

    };
    fetchData();

    
  },
};
</script>
<style scoped>

</style>