<template>
    <div id="home">
        <span class="md-display-3">Welcome to the Todo Application!</span><br><br><br><br>
        <md-layout  md-align="center" md-flex="5">
          <router-link tag="md-button" to="/login" class="md-raised md-primary">Login</router-link>
          <router-link tag="md-button" to="/signup" class="md-raised md-accent">Sign Up</router-link>
        </md-layout>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  }

}
</script>

<style>

</style>