<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">Image</div>
      <n-space vertical>
        <n-input round v-model:value="email" placeholder="Email" />
        <n-input
          round
          type="password"
          v-model:value="password"
          show-password-on="mousedown"
          placeholder="Password"
        />
        Not registered yet?
        <router-link to="/RegisterPage">Create an account</router-link>
        <span>Forget Password?</span>
        <n-button id="login-btn" round type="primary" v-on:click="login()">
          Login
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginBox",
  data() {
    return {
      email: "",
      password: "",
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
          this.$router.push({name:"HomePage"})
        })
        .catch((error) => {
          console.log("Error in signing in" + error.message);
        });
    },
  },
};
</script>

<style scoped>
.container {
  background: grey;
  padding: 15px;
  position: absolute;
  top: 60%;
  left: 30%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#login-btn {
  width: 5 auto;
}
</style>