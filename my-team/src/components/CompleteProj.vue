<template>
  <div id = "completeproj" v-if = "leader">
  <n-button strong secondary round type = "success" id="completeBut" @click="complete()">
    Mark As Completed
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
        projid: this.$route.params.id,
        leader:false,
    }},
    mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                this.user = user;
                checkleader(this.user.email, this.projid).then((x)=>{this.leader = x})
            }
        })
        async function checkleader(user, projid) {
        let z = await getDoc(doc(db, "Users", user));
        let leadingproj = z.data().LeadingProjects
        let a = await getDoc(doc(db,"Projects",projid))
        if (leadingproj.includes(projid) == true && a.data().CompletionStatus == "In Progress"){
            return true
        }else{
            return false
        }
    }
    },
    methods:{
        async complete(){
            let check = confirm("Are you sure you want to complete this project?")
            if (check == true){
            const projRef = doc(db, "Projects", this.projid)
            await updateDoc(projRef, {
              CompletionStatus: "Completed",
              CompletionDate: new Date().toLocaleDateString()
              });
            this.$router.push('/HomePage');
            }
        }
    }

}
</script>

<style>
</style>