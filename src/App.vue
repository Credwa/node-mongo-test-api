<template>
  <div id="app">
    <md-whiteframe md-elevation="2">
      <md-toolbar class="md-accent" style="margin-bottom:10rem">
        <md-button class="md-icon-button">
          <md-icon>navigate_before</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">Todo App</h2>
      </md-toolbar>
    </md-whiteframe>

    <md-layout md-align="center" md-flex="5">
      <transition name="slide" mode="out-in">
          <router-view></router-view>
      </transition>
    </md-layout>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
  .slide-leave-active {
        transition: opacity 1s ease;
        opacity: 0;
        animation: slide-out 1s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in 1s ease-out forwards;
    }

    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>
