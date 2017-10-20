<template>
  <div id="login">
    <md-card md-with-hover>
        <md-layout  md-align="center" md-flex="5">
            <md-card-header  style="margin-right: 8rem; margin-left: 8rem" >
                <div class="md-title">Login</div>
            </md-card-header>
        </md-layout>

        <md-card-content >
            <form novalidate @submit.stop.prevent="submit">
                <md-input-container :class="{'md-input-invalid': !validateEmail}" >
                    <label>Email </label>
                    <md-input v-model.lazy.trim="email" required type="email" ></md-input>
                    <span class="md-error">Not a valid Email Address</span>
                </md-input-container>
                <md-input-container :class="{'md-input-invalid': !validatePassword}">
                    <label>Password </label>
                    <md-input v-model.lazy="password" type="password" required></md-input>
                    <span class="md-error">Password Must Be 6 Characters</span>
                </md-input-container>
            </form>
        </md-card-content>

        <md-card-actions>
            <md-button class="has-ripple md-raised md-primary" :disabled="formValid"> <md-ink-ripple />Login</md-button>
            <md-button class="has-ripple md-raised md-accent" @click="clearForm"> <md-ink-ripple />Clear Form</md-button>
        </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      emailValid: false,
      passwordValid: false
    };
  },
  methods: {
    clearForm: function() {
      this.email = "";
      this.password = "";
    }
  },
  computed: {
    validateEmail: function() {
      const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let result = false;
      if (emailReg.test(this.email)) {
        result = true;
      }
      if (this.email.length === 0) {
          result = true;
      }
      this.emailValid = result;
      return result;
    },
    dirtiedEmail: function() {
      return !this.email.length === 0;
    },
    validatePassword: function() {
      const passwordReg = /^[a-zA-Z0-9]{6,}$/; // 6 Characters
      let result = false;
      if (passwordReg.test(this.password)) {
        result = true;
      }
      if (this.password.length === 0) {
          result = true;
      }
      this.passwordValid = result;
      return result;
    },
    formValid: function() {
      let disabled = true;
      if (this.email.length === 0 || this.password.length === 0) {
        disabled = true;
      } else if (this.emailValid && this.passwordValid) {
        disabled = false;
      }
      return disabled;
    },
    isValidStyle: function() {
        return {

        }
    }
  }
};
</script>

<style>

</style>