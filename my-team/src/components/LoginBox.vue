<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">Image</div>
      <n-space vertical>
        <n-input round placeholder="Email" />
        <n-input
          round
          type="password"
          show-password-on="mousedown"
          placeholder="Password"
          :maxlength="8"
        />
        Not registered yet? Create an account Forget Password?
        <n-button id= "login-btn" round type="primary"> Login </n-button>
      </n-space>
    </div>
  </div>
</template>

<script>
export default {};
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
    width:5 auto
}
</style>