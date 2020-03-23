<template>
  <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form class="login100-form validate-form flex-sb flex-w" @submit.prevent="login">
            <span class="login100-form-title p-b-32">Account Login</span>

            <span class="txt1 p-b-11">Username</span>
            <div class="wrap-input100 validate-input m-b-36">
              <input v-model="username" class="input100" type="text" name="username" />
              <span class="focus-input100"></span>
            </div>

            <span class="txt1 p-b-11">Password</span>
            <div class="wrap-input100 validate-input m-b-12">
              <input v-model="password" class="input100" type="password" name="pass" />
              <span class="focus-input100"></span>
            </div>

            <div class="container-login100-form-btn mt-4">
              <button class="login100-form-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="dropDownSelect1"></div>
  </div>
</template>
<script>
import { axios } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        let input = {
          username: this.username,
          password: this.password
        };
        let { data } = await axios.post("/login", input);
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          localStorage.setItem("username", data.username);
          this.$router.push({
            path: "/"
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
        }
      } catch (error) {
          
      }
    }
  }
};
</script>
