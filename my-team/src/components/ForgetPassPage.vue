<template>
  <div id="leftHalf">
    <div class="error" v-if="error">{{ error.message }}</div>
    <div class="container">
      <div id="logobox">
        <img id="logo" alt="logo" src="@/assets/MYTeamLogo.png" />
        <h3><b>Forget your password?</b></h3>
      </div>
      <form @submit.prevent="pressed">
        <n-space vertical>
          <n-input round v-model:value="email" placeholder="Email" />
          <div id="errorbox">
            <div id="errormessage1"></div>
            <div id="errormessage2"></div>
          </div>
          <div>
            <n-button id="reset-btn" round type="primary" v-on:click="reset()">
              Reset your password
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
    <img
      id="backgroundimg"
      alt="background"
      src="@/assets/registerbackgroundimg.jpg"
    />
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
  name: "ForgetPassPage",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: "LoginPage" });
    },
    checkPass() {
      var pass = true;
      console.log("Entered checkPass");

      if (this.email.length == 0) {
        document.getElementById("errormessage2").innerHTML =
          "- Empty input fields detected*";
        pass = false;
      }
      return pass;
    },
    reset() {
      if (this.checkPass()) {
        console.log("Entered Reset");

        const auth = getAuth();
        sendPasswordResetEmail(auth, this.email)
          .then(() => {
            console.log(this.email + " reset email link sent");
            alert(
              "We have sent the link to your email address to reset your password! Do check your email!"
            );
            this.$router.push({ name: "LoginPage" });
          })
          .catch((error) => {
            document.getElementById("errormessage2").innerHTML = "";
            console.log(error.message);
            document.getElementById("errormessage1").innerHTML =
              "The email address is not valid. Try Again.";
          });
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}

.container {
  /* background: grey; */
  padding: 10px;
  position: absolute;
  width: 60%;
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
  width: 180px;
  height: 180px;
}
#backgroundimg {
  height: 100%;
  width: 100%;
}
#login-btn {
  margin-top: 7px;
  width: 100%;
  background-color: rgb(77, 77, 77);
}
#reset-btn {
  width: 100%;
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
