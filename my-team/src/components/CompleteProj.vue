<template>
  <div id = "completeproj" v-if = "leader">
  <n-button strong secondary round type = "success" id="completeBut" @click="complete()">
    Complete Project
  </n-button>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {doc, getDoc, updateDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
    data(){
        return{
        user:false,
        projid: this.$store.state.projectID,
        leader:false
    }},
    mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                this.user = user;
                checkleader(this.user.email, this.projid).then((x)=>{this.leader = x})
                console.log(this.leader)
            }
        })
        async function checkleader(user, projid) {
        let z = await getDoc(doc(db, "Users", user));
        let leadingproj = z.data().LeadingProjects
        return leadingproj.includes(projid)
    }
    },
    methods:{
        async complete(){
            let check = confirm("Are you sure you want to complete this project?")
            if (check == true){
            const projRef = doc(db, "Projects", this.projid)
            await updateDoc(projRef, {
              CompletionStatus: "Completed"
              });
            this.$router.push('/HomePage');
            }
        }
    }

}
</script>

<style>
</style>