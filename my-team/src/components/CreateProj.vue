<template>
  <div id = "body" v-if = "user">
      <button id = "back" @click = "backHome()"> &#8249; Home </button>
    <h1 id = "heading"> Create a new project </h1>
    <div id = "proj_name">
        <form>
        <label for="name" >Project Name: </label> <br>
        <input type="text" id="name" required="" size = "30" v-model = "name"> <br><br>
        <label for="details">Project Details: </label> <br>
        <textarea id="details" name="details" rows="6" cols="40" v-model = "details"></textarea>
        </form>
    </div>
    <div id = "add_member">
        <form id= "addMemForm">
            <label for="add" >Add New Members: </label> <br>
            <input type="text" id="add" required="" placeholder="Enter Email" size = "20" v-model = "member">
            <button id = 'addBut' type = "button" @click = "addMember()" >
                +
            </button> <br><br>
            <label>Team Members: </label> <br>
            <div id = "members">
            </div>
        </form>
    </div>
  <div id = "createBut">
      <button id = "create" round @click = "createProj()"> Create &raquo; </button>
  </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {doc, getDoc,collection,addDoc, updateDoc,arrayUnion} from "firebase/firestore";
const db = getFirestore(firebaseApp);
export default {
    data(){
        return {
            user:false,
            name:"",
            details:"",
            member:"",
            memberTotal: new Array()
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
    methods:{
        backHome(){
            this.$router.push('/HomePage');
        },
        deleteMember(array, email){
            confirm("Going to delete this member!")
            const index = array.indexOf(email)
            array.splice(index, 1)
            this.memberTotal = array
            let elem = document.getElementById(email)
            elem.remove()
        },
        async addMember(){
            let z = await getDoc(doc(db, "Users", this.member));
            if (z.exists()) {
            let yy = z.data()
            console.log(yy)
            this.memberTotal.push(String(yy.Email))
            console.log(this.memberTotal.length)
            var bu = document.createElement("button")
            bu.type = "button"
            bu.className = "memberBut"
            bu.id = String(yy.Email)
            bu.innerHTML = yy.FullName + "&#x2715"
            let email = String(yy.Email)
            let array = this.memberTotal
            bu.onclick = function() {
                confirm("Going to delete this member!")
                const index = array.indexOf(email)
                array.splice(index, 1)
                this.memberTotal = array
                console.log(this.memberTotal.length)
                let elem = document.getElementById(email)
                elem.remove()
            }
            
        let memberTable = document.getElementById("members")
        memberTable.appendChild(bu)
        } else {
            alert("User does not exist!")
        }
        document.getElementById("addMemForm").reset()
        },
        async createProj(){
            var projname = this.name;
            var projdetails = this.details;
            var projmembers = this.memberTotal;
            var projleader = String(this.user.email);
            alert("Create Project: " + projname)
            try{
                const docRef = await addDoc(collection(db, "Projects"), {
                    Name: projname,
                    Details: projdetails,
                    Leader: projleader,
                    StartDate: new Date().toLocaleDateString(),
                    Members: projmembers,
                    Tasks: new Array(),
                    CompletionStatus: "In Progress"
                    });
                console.log(docRef.id)
                var projid = docRef.id
                const leaderRef = doc(db, "Users", projleader)
                await updateDoc(leaderRef, {
                    LeadingProjects: arrayUnion(projid)
                    });
                for (let i = 0; i < projmembers.length; i++) {
                    await updateDoc(doc(db,"Users", projmembers[i]), {
                        Projects: arrayUnion(projid)
                    })
                }


                
            }
            catch(error){
                console.error("Error adding document:", error);
            }
            this.$router.push('/ProjectPage');

        }
    }
}


</script>

<style scoped>
#body{
            
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        #heading{
        position: absolute;
        top:50px;
        margin-left: 550px;
        font-size:30px;
        
        
        /* Add a new project */
        }
        
        #back{
            position:absolute;
            top:80px;
            margin-left: 100px;
            background-color: #04AA6D;
            color: white;
            padding: 5px;
            font-size: 18px;
            display: inline-block
        }
        #proj_name{
            position: absolute;
            top: 180px;
            margin-left: 140px;
            height: 500px;
            display:inline-block;
        }
        #add_member{
            position:absolute;
            top: 180px;
            left: 650px;
            height: 500px;
            margin-left: 90px;
            display:inline-block;
    
        }
        #createBut{
            position:absolute;
            top:500px
        }
        form{
            font-size: 20px;

        }
        input, textarea{
            border: 1px solid black;
            font-size: 18px;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        #addBut{
            border-radius: 10px;
            font-size: 20px;
            position:relative;
            margin-left: 10px;
        }
        #create{
            background-color: #04AA6D;
            color: white;
            padding: 10px;
            font-size: 20px;
            margin-top: 50px;
            margin-left: 1000px;
        }
        #create:hover, #back:hover{
            background-color: #ddd;
            color: black;
        }
        #members {
            background-color:#04AA6D;
            height: 200px;
            width: 500px;
        }
        .memberBut{
            margin: 10px;
            font-size:16px;
        }

</style>