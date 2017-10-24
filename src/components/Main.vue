<template>
    <div id="main">
        <md-layout md-align="center">
            <md-button class="md-icon-button md-raised md-primary" @click="addTodo">
                <md-icon>add todo</md-icon>
            </md-button>
        </md-layout>
        <md-layout md-align="center">
        <md-card md-with-hover style="margin-bottom:2rem" v-if="create">
            <md-card-header>
                <md-input-container>
                    <label>To do Title</label>
                    <md-input v-model="newTodo"></md-input>
                </md-input-container>
            </md-card-header>

            <md-card-content>
                <md-layout md-align="center">
                    <div>
                        <md-radio v-model="createOption" id="my-test1" name="my-test-group1" md-value="0" checked>Incomplete</md-radio>
                        <md-radio v-model="createOption" id="my-test2" name="my-test-group1" md-value="1">Completed</md-radio> <br>
                        <md-layout md-align="center">
                            <span style="color:red" v-if="todoEmpty">To do can't be empty!</span>
                        </md-layout>
                    </div>
                </md-layout>
            </md-card-content>

            <md-card-actions>
                <md-button class="md-primary" @click="doneCreating">Done</md-button>
                <md-button class="md-warn" @click="cancel">Cancel</md-button>
            </md-card-actions>
        </md-card>

        </md-layout>


        <md-layout md-row v-if="!err">
            <md-layout >
                <md-layout md-flex="70">
                    <md-layout md-align="center" >
                        <div v-for="todo in todos" :key="todo._id">
                            <todo-detail :todoData="todo" @todoDeleted="incTodoWasDeleted($event)" @todoCompleted="todoWasCompleted($event)"></todo-detail>
                        </div>
                    </md-layout>
                </md-layout>
            </md-layout>
            <md-layout md-align="end">
                <md-layout md-flex="70" >
                    <md-layout>
                        <div v-for="todo in completedTodos" :key="todo._id">
                            <todo-detail :todoData="todo" @todoDeleted="comTodoWasDeleted($event)" @todoIncompleted="todoWasIncompleted($event)"></todo-detail>
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
      err: false,
      create: false,
      createOption: 0,
      newTodo: "",
      todoEmpty: false
    };
  },
  methods: {
    addTodo: function() {
      this.create = true;
    },
    doneCreating: function() {
      let myBool = false;
      let tempTodo = {};
      this.createOption === 0 ? (myBool = false) : (myBool = true);
      if (this.newTodo.length > 0) {
        this.$http
          .post(
            "todos",
            { text: this.newTodo, completed: myBool },
            {
              headers: { "x-auth": this.$cookie.get("x-auth") }
            }
          )
          .then(
            res => {
              if (myBool) {
                this.completedTodos.unshift(res.body);
              } else {
                this.todos.unshift(res.body);
              }
            },
            err => {
              console.log(err);
            }
          );
        this.create = !this.create;
        this.createOption = 0;
        this.newTodo = "";
      } else {
        this.todoEmpty = true;
      }
    },
    cancel: function() {
      this.todoEmpty = !this.todoEmpty;
      this.create = !this.create;
      this.createOption = 0;
      this.newTodo = "";
    },
    incTodoWasDeleted: function(e) {
      this.todos = this.todos.filter(todo => {
        return todo._id !== e;
      });
    },
    comTodoWasDeleted: function(e) {
      this.completedTodos = this.completedTodos.filter(todo => {
        return todo._id !== e;
      });
    },
    todoWasIncompleted: function(e) {
      console.log(this.todos);
      this.todos.push({ text: "tell", completed: "false" });
      console.log(this.todos);
    },
    todoWasCompleted: function(e) {
      let tempTodo = {};
      this.completedTodos = this.completedTodos.filter(todo => {
        if (todo._id === e) {
          tempTodo = todo;
        }
        this.completedTodos = tempTodo;
        return todo._id !== e;
      });
    }
  },
  mounted() {
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
          this.completedTodos.splice(0, 1);
        },
        err => {
          this.err = true;
        }
      );
  },
  beforeRouteEnter(to, from, next) {
    if (auth.authenticate) {
      next();
    } else {
      next(false);
    }
  }
};
</script>

<style>

</style>