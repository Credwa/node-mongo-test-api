<template>
  <div id="login">
    <md-card md-with-hover v-if="!loading">
        <md-layout  md-align="center" md-flex="5">
            <md-card-header  style="margin-right: 8rem; margin-left: 8rem" >
                <div class="md-title">Login</div>
            </md-card-header>
        </md-layout>

        <md-card-content >
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container :class="{'md-input-invalid': !validateEmail}" >
                    <label>Email </label>
                    <md-input v-model.lazy.trim="user.email" required type="email" ></md-input>
                    <span class="md-error">Not a valid Email Address</span>
                </md-input-container>
                <md-input-container :class="{'md-input-invalid': !validatePassword}">
                    <label>Password </label>
                    <md-input v-model.lazy="user.password" type="password" required></md-input>
                    <span class="md-error">Password Must Be atleast 6 Characters</span>
                </md-input-container>
            </form>
        </md-card-content>

        <md-card-actions>
            <md-button class="has-ripple md-raised md-primary" :disabled="formValid" @click="submit" @keyup.enter.native="submit"> <md-ink-ripple />Login</md-button>
            <md-button class="has-ripple md-raised md-warn" @click="clearForm"> <md-ink-ripple />Clear Form</md-button>
        </md-card-actions>
        <md-layout  md-align="center" md-flex="5">
          <span style="color:red" v-if="failed">Username or password incorrect</span>
        </md-layout>
    </md-card>
    <md-layout  md-align="center" md-flex="5" v-if="loading">
          <md-spinner  :md-size="150" md-indeterminate class="md-warn" v-if="loading"></md-spinner>
    </md-layout>
  </div>
</template>

<script>
import auth from "../services/authenticate";
export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      loading: false,
      failed: false
    };
  },
  methods: {
    clearForm: function() {
      this.user.email = "";
      this.user.password = "";
    },
    submit: function() {
      this.loading = true;
      this.$http.post("users/login", this.user).then(
        res => {
          this.$cookie.set("x-auth", res.body.token);
          auth.authenticate(true);
          this.$router.push("/main");
          this.loading = false;
        },
        err => {
          console.log(err);
          this.failed = true;
          this.loading = false;
        }
      );
    }
  },
  computed: {
    validateEmail: function() {
      this.failed = false;
      const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let result = false;
      if (emailReg.test(this.user.email)) {
        result = true;
      }
      if (this.user.email.length === 0) {
        result = true;
      }
      return result;
    },
    validatePassword: function() {
      this.failed = false;
      const passwordReg = /^[a-zA-Z0-9]{6,}$/; // 6 Characters
      let result = false;
      if (passwordReg.test(this.password)) {
        result = true;
      }
      if (this.user.password.length === 0) {
        result = true;
      }
      return result;
    },
    formValid: function() {
      let disabled = true;
      if (this.user.email.length === 0 || this.user.password.length === 0) {
        disabled = true;
      } else if (this.validateEmail && this.validatePassword) {
        disabled = false;
      }
      return disabled;
    }
  }
};
</script>

<style>
</style>