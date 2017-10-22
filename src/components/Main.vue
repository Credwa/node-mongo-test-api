<template>
    <div id="main">
        <md-layout md-align="center">
        <md-button class="md-icon-button md-raised md-primary">
            <md-icon>add todo</md-icon>
        </md-button>
        </md-layout>
        <md-layout md-row v-if="!err">
            <md-layout >
                <md-layout md-flex="70">
                    <md-layout md-align="center" >
                        <div v-for="todo in todos" :key="todo._id">
                            <todo-detail :todoData="todo"></todo-detail>
                        </div>
                    </md-layout>
                </md-layout>
            </md-layout>
            <md-layout md-align="end">
                <md-layout md-flex="70" >
                    <md-layout>
                        <div v-for="todo in completedTodos" :key="todo._id">
                            <todo-detail :todoData="todo"></todo-detail>
                        </div>
                    </md-layout>
                </md-layout>
            </md-layout>
        </md-layout>
        <md-layout md-row v-if="err">
            <span class="md-display-2">Could not load todos!</span>
        </md-layout>
    </div>
</template>

<script>
import auth from "../services/authenticate";
import todoDetail from "./todos/TodoDetail.vue";
export default {
  name: "main",
  components: {
    "todo-detail": todoDetail
  },
  data() {
    return {
      todos: [{}],
      completedTodos: [{}],
      err: false
    };
  },
  mounted() {
    console.log(this.$router.currentRoute)
    this.$http
      .get("todos", {
        headers: { "x-auth": this.$cookie.get("x-auth") }
      })
      .then(
        response => {
          for (let i in response.body.todos) {
            if (response.body.todos.hasOwnProperty(i)) {
              if (response.body.todos[i].completed === true) {
                this.completedTodos.push(response.body.todos[i]);
              } else {
                this.todos.push(response.body.todos[i]);
              }
            }
          }
          this.todos.splice(0, 1);
          this.completedTodos.splice(0,1);
          console.log(this.todos);
          console.log(this.completedTodos);
        },
        err => {
          this.err = true;
        }
      );
  },
  beforeRouteEnter(to, from, next) {
    // next(auth.authenticate());
    next();
  }
};
</script>

<style>

</style>