<template>
  <div id="app">
    <md-whiteframe md-elevation="2">
      <md-toolbar class="md-accent" style="margin-bottom:10rem">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">Todo App</h2>
      </md-toolbar>
    </md-whiteframe>

    <md-layout md-align="center" md-flex="5">
      <router-view></router-view>
    </md-layout>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
