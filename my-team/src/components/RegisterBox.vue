<template>
  <div id="leftHalf">
    <div class="error" v-if="error">{{ error.message }}</div>
    <div class="container">
      <div id="logobox">
        <img id="logo" alt="logo" src="@/assets/MYTeamLogo.png"/>
        <h3><b>Welcome to Register Page</b></h3>
        </div>
    <form @submit.prevent="pressed">
      <n-space vertical>
        <n-input round v-model:value ="fullName" placeholder="Full Name" />
        <n-input round v-model:value="mobileNo" placeholder="Mobile Number" />
        <n-input round v-model:value ="email" placeholder="Email" />
        <n-input round v-model:value="position" placeholder="Position" />
        <n-input
          round
          type="password"
          v-model:value="password"
          show-password-on="mousedown"
          placeholder="Password"
        />
        <div id="errorbox">
        <div id="errormessage1"> </div>
        <div id="errormessage2"> </div>
        <div id="errormessage3"> </div>
        </div>
        <div>
        <n-button
          id="create-btn"
          round
          type="primary"
          v-on:click="register()"
        >
          Create Account
        </n-button>
        <n-button
          id="login-btn"
          round
          type="primary"
          v-on:click="goToLogin()"
        >
          Back to Login
        </n-button>
        </div>
      </n-space>
    </form>
    </div>
  </div>
<div id="rightHalf">
    <img id= "backgroundimg" alt="background" src="@/assets/registerbackgroundimg.jpg"/>
</div>

</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default {
  name: "RegisterBox",
  data() {
    return {
      email: "",
      password: "",
      mobileNo: "",
      position: "",
      fullName: "",
    };
  },
  methods: {
    goToLogin() {
        this.$router.push({ name: "LoginPage"})
    },
    checkPass(){
      var pass = true;
      console.log("Entered checkPass");
      if (this.password.length < 6) {
        document.getElementById("errormessage1").innerHTML = "- Password must be at least 6 letters!";
        pass = false;
      }
      if (this.mobileNo.length < 8 || this.mobileNo[0] != 9 || this.mobileNo[0] != 9) {
        document.getElementById("errormessage2").innerHTML = "- Mobile Number must be 8 digits and starts with 8/9";
        pass = false;
      }

      if (this.email.length == 0 || this.password.length == 0|| this.mobileNo.length == 0|| this.position.length == 0||this.fullName.length == 0) {
        document.getElementById("errormessage3").innerHTML = "- Empty input fields detected";
        pass = false;
      }
      return pass
    },
    register() {
      if (this.checkPass()) {
        console.log("Entered Register");
        const db = getFirestore(firebaseApp);
        
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((user) => {
          console.log("User Created" + user);
            setDoc(doc(db, "Users", this.email), {
                FullName: this.fullName,
                Email: this.email,
                Mobile: this.mobileNo,
                Position: this.position,
                Projects: [],
                LeadingProjects:[],
            })
            console.log(this.email +" details added");
            alert("You have successfully signed up! Welcome to the Home Page!");
            this.$router.push({name:"HomePage"});
        })
        .catch((error) => {
            console.log("There is an error");
          console.log(error);
        });
      }
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
  padding: 10px; 
  position: absolute;
  width:60%;
  top: 50%;
  left: 55%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#errorbox {
  font-size: 12px;
  color: red;
}
#logo {
  width:180px;
  height:180px;
}
#backgroundimg {
  height:100%;
  width:100%;
}
#login-btn {
  margin-top: 7px;
  width:100%;
  background-color: rgb(77, 77, 77);
}
#create-btn {
  width:100%;
}
#logobox {
  /* background-color:red; */
  text-align: center;
  /* margin-bottom: 15px; */
}

#rightHalf {
   width: 49%;
   position: absolute;
   right: 0px;
   height: 100%;
}

#leftHalf {
   width: 50%;
   position: absolute;
   left: 0px;
   height: 100%;
}
</style>