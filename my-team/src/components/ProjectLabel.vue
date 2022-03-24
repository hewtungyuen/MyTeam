<template>
  <n-card :bordered="false" title = {{title}}>
    Team Leader: {{teamleader}}
    <br>
    Started on: {{date}}
    <br>
    Team Members: Yi Chen, Tung Yuen
    <br>
    Details: {{details}}
  </n-card>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { doc, getDoc,collection } from "firebase/firestore";

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
                console.log(this.user.email)
            }
        })

    },

    async function display() {
      let z = await getDocs(collection(db, this.$store.state.projectID));
      let yy = docs.data();
      this.teamleader = yy.Leader;
      this.details = yy.Details;
      this.date = yy.StartDate;
      this.title = yy.Name;
      
      yy.Members.forEach((docs) => {
        this.memberTotal += docs ", "
      })
    }
}
</script>