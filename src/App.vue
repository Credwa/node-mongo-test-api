<template>
  <div id="app">
    <md-whiteframe md-elevation="2">
      <md-toolbar class="md-accent" style="margin-bottom:10rem">
        <md-button class="md-icon-button" @click="toHome">
          <md-icon >home</md-icon>
        </md-button>
        <h2 class="md-title" style="flex: 1">Todo App</h2>
        <md-layout md-align="end">
            <md-button class=" md-raised md-warn" @click="logout" v-if="showButton">
                logout
            </md-button>
        </md-layout>
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
import auth from "./services/authenticate";

export default {

  name: "app",
  data() {
    return {
      showButton: false
    };
  },
  methods: {
    logout: function() {
      this.$router.push("/login");
      auth.authenticate(false);
    },
    toHome: function() {
      this.$router.push("/");
    }
  },
  watch: {
    $route: function() {
      if (this.$router.currentRoute.path === "/main") {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
    }
  },
  mounted() {
    if (this.$router.currentRoute.path === "/main") {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }
};
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
