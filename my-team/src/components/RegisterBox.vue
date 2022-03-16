<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
      Register
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
      </n-space>
    </form>
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
    register() {
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
        })
        .catch((error) => {
            console.log("There is an error");
          console.log(error);
        });
      
    },

  },
};
</script>

<style>
</style>