<template>
  <h1>{{title}}</h1>
  <n-card :bordered="false">  
    Team Leader: {{teamleader}}
    <br>
    Started on: {{date}}
    <br>
    Team Members: {{memberTotal}}
    <br>
    Details: {{details}}
  </n-card>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
    data(){
        return {
            user:false,
            title:"",
            teamleader:"",
            date:"",
            details:"",
            memberTotal: ""
        }
    },
    mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                this.user = user;
            }
        });
    
    
        let projectDetails = getDocs(collection(db, "Projects"));
        //let userDetails = getDocs(collection(db, "Users"));
        console.log(projectDetails);

        projectDetails.then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            if (doc.id == this.$route.params.id) {
              console.log("Found the project in database")
              let yy = doc.data();

              //get name of each
              // userDetails.then((getShot) => {
              //   getShot.forEach((val) => {
              //     let zz = val.data();
              //     if (yy.leader == zz.Email) {
              //       this.teamleader += zz.FullName;
              //     }
              //   })
              // })

              this.teamleader = "(" + yy.Leader + ")";
              this.details = yy.Details;
              this.date = yy.StartDate;
              this.title = yy.Name;

              yy.Members.forEach((mem) => {
                this.memberTotal += "(" + mem + ") "
              })
            }
          })
        })
    },
}
</script>