  <template>
  
  
<div id="rightHalf">
<div class="row">
  <div class="container">
      
      <div id="logobox">
        <img alt="logo" src="@/assets/MYTeamLogo.png"/>
        <h2>Welcome to MYTeam! <router-link to="/HomePage">Cheat Login!</router-link></h2>
        </div>
      <n-space vertical>
        <n-input round v-model:value="email" placeholder="Email" />
        <n-input
          round
          type="password"
          v-model:value="password"
          show-password-on="mousedown"
          placeholder="Password"
        />
        <div id ="errormessage1"></div>
        <div id="belowboxleft">
        Not registered yet?
        <router-link to="/RegisterPage">Create an account</router-link>
        </div>
        
        <router-link id = "forgetpass" to="/ForgetPassPage">Forget Password?</router-link>
        
        <n-button id="login-btn" round type="primary" v-on:click="login()">
          Login
        </n-button>
      </n-space>
    </div>
  </div>
</div>
<div id="leftHalf">
    <img id= "backgroundimg" alt="background" src="@/assets/loginbackgroundimg2.jpg"/>
</div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import {
//   collection,
//   getDocs,
//   getFirestore,
// } from "firebase/firestore";
// import firebaseApp from "../firebase.js";


// var db = getFirestore(firebaseApp);

export default {
  name: "LoginBox",
  data() {
    return {
      email: "marvin.leow999@gmail.com",
      password: "123456",
    };
  },
  methods: {
    login() {
      console.log("Entered Login");
      console.log("Email entered: " + this.email)
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((user) => {
          console.log(user.user);
          // var allUsers = getDocs(collection(db, "Users"));
          // var allProjects = getDocs(collection(db, "Projects"));

          // var projNames = [];
          // var projIDs = [];
          // allUsers.then((QuerySnapshot) => {
          //   QuerySnapshot.forEach((d) => {
          //     // console.log(d.data())
          //     if (d.data().Email == user.user.email) {
          //       // console.log(d.data().Projects);
          //       projIDs = d.data().Projects;
          //     }
          //   })
          // })

          // allProjects.then((QuerySnapshot) => {
          //   QuerySnapshot.forEach((d) => {
          //     // console.log(d.data())
          //     if (projIDs.includes(d.id)) {
          //       projNames.push(d.data().Name)
          //       // projIDs = d.data().Projects;
          //     }
          //   })
          // })

          this.$router.push({name:"HomePage"})
        })
        .catch((error) => {
          console.log("Error in signing in" + error.message);
          document.getElementById("errormessage1").innerHTML = "Incorrect Email or Password. Try Again"
        });
      
      

    },
  },
};
</script>

<style scoped>
html, body {
    height: 100%;
    padding: 0;
    margin: 0;
}
.container {
  /* background: grey; */
  padding: 15px; 
  position: absolute;
  width:60%;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#login-btn {
  width: 100%;
}
#forgetpass {
  color:rgb(184, 16, 16);
}
#rightHalf {
   width: 55%;
   position: absolute;
   right: 0px;
   height: 100%;
}

#leftHalf {
   /* background: url(bg-1.jpg); */
   width: 47%;
   position: absolute;
   left: 0px;
   height: 100%;
}
#logobox {
  /* background-color:red; */
  text-align: center;
  /* margin-bottom: 15px; */
}

#backgroundimg {
  height:100%;
  width:100%;
}

#belowboxleft {
  float: left;
}

#belowboxright {
  float: left;
}

#errormessage1 {
  font-size: 12px;
  color: red;
}
</style>