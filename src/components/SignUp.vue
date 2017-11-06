<template>
  <div id="signup">
    <md-card md-with-hover v-if="!loading">
        <md-layout  md-align="center" md-flex="5"  v-if="!success">
            <md-card-header  style="margin-right: 8rem; margin-left: 8rem" >
                <div class="md-title">Sign Up</div>
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
                <md-input-container :class="{'md-input-invalid': !validateConfirmedPassword}">
                    <label>Confirm Password </label>
                    <md-input v-model.lazy="confirmPassword" type="password" required></md-input>
                    <span class="md-error">Passwords Don't match</span>
                </md-input-container>
            </form>
        </md-card-content>

        <md-card-actions>
            <md-button class="has-ripple md-raised md-primary" :disabled="formValid" @click="submit"  @keyup.enter.native="submit"> <md-ink-ripple />Sign Up</md-button>
            <md-button class="has-ripple md-raised md-warn" @click="clearForm"> <md-ink-ripple />Clear Form</md-button>
        </md-card-actions>
        <md-layout  md-align="center" md-flex="5">
          <span style="color:red" v-if="exists">User with that email already exists!</span>
        </md-layout>
    </md-card>
    <md-layout  md-align="center" md-flex="5" v-if="loading">
          <md-spinner  :md-size="150" md-indeterminate class="md-warn" v-if="!success"></md-spinner>
    </md-layout>
    <md-layout  md-align="center" md-flex="5" v-if="success">
          <span class="md-display-1">Sign up Successful! Navigating you to login page</span><br>
    </md-layout>
  </div>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      confirmPassword: "",
      loading: false,
      exists: false,
      success: false
    };
  },
  methods: {
    clearForm: function() {
      this.user.email = "";
      this.user.password = "";
    },
    submit: function() {
      this.loading = true;
      this.$http.post('users', this.user)
        .then((res) => {
          this.success = true;
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000)
        }, (err) => {
          this.exists = true;
          this.loading = false;
        });
    }
  },
  computed: {
    validateEmail: function() {
      this.exists = false;
      const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
      const passwordReg = /^[a-zA-Z0-9]{6,}$/; // 6 Characters
      let result = false;
      if (passwordReg.test(this.user.password)) {
        result = true;
      }
      if (this.user.password.length === 0) {
        result = true;
      }
      return result;
    },
    validateConfirmedPassword: function() {
      return this.user.password === this.confirmPassword;
    },
    formValid: function() {
      let disabled = true;
      if (this.user.email.length === 0 || this.user.password.length === 0) {
        disabled = true;
      } else if (
        this.validateEmail &&
        this.validatePassword &&
        this.validateConfirmedPassword
      ) {
        disabled = false;
      }

      return disabled;
    }
  }
};
</script>

<style>

</style>