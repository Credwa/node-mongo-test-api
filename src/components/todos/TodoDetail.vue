<template>
    <div id="todo-detail">
        <md-card md-with-hover style="margin-bottom:2rem" v-if="!editMode">
            <md-card-header>
                <div class="md-title">{{todoData.text}}</div>
            </md-card-header>

            <md-card-content>
                <md-layout md-align="end">
                    <span class="md-body-2" v-if="todoData.completed">Completed at : {{new Date(todoData.completedAt).toUTCString()}} </span>
                </md-layout>
            </md-card-content>

            <md-card-actions>
                <md-button class="md-primary" @click="editTodo">Edit</md-button>
                <md-button class="md-accent" @click="completeTodo" v-if="!todoData.completed">Complete</md-button>
                <md-button class="md-accent" @click="incompleteTodo" v-if="todoData.completed"> Incomplete</md-button>
                <md-button class="md-warn" @click="deleteTodo">Delete</md-button>
            </md-card-actions>
        </md-card>

        <!-- Edit Mode -->
        <md-card md-with-hover style="margin-bottom:2rem" v-if="editMode">
            <md-card-header>
                <md-input-container>
                    <label>Edit Text</label>
                    <md-input @keyup.enter.native="editTodo" v-model="todoData.text"></md-input>
                </md-input-container>
            </md-card-header>

            <md-card-content>
                <md-layout md-align="end">
                    <span class="md-body-2" v-if="todoData.completed">Completed at : {{new Date(todoData.completedAt).toUTCString()}} </span>
                </md-layout>
            </md-card-content>

            <md-card-actions>
                <md-button class="md-primary" @click="editTodo" @keyup.enter.native="editTodo">Done</md-button>
                <md-button class="md-accent" @click="completeTodo" v-if="!todoData.completed">Complete</md-button>
                <md-button class="md-accent" @click="incompleteTodo" v-if="todoData.completed"> Incomplete</md-button>
                <md-button class="md-warn" @click="deleteTodo">Delete</md-button>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
export default {
  props: ["todoData"],
  name: "todo-detail",
  data() {
    return {
      completed: false,
      editMode: false,
      tempText: this.todoData.text
    };
  },
  methods: {
    deleteTodo: function() {
      this.$http
        .delete(`todos/${this.todoData._id}`, {
          headers: { "x-auth": this.$cookie.get("x-auth") }
        })
        .then(
          res => {
            this.$emit("todoDeleted", this.todoData._id);
          },
          err => {
            console.log(err);
          }
        );
    },
    completeTodo: function() {
      this.$http
        .patch(
          `todos/${this.todoData._id}`,
          { completed: true },
          {
            headers: { "x-auth": this.$cookie.get("x-auth") }
          }
        )
        .then(
          res => {
            this.$emit("todoCompleted", this.todoData._id);
          },
          err => {
            console.log(err);
          }
        );
    },
    incompleteTodo: function() {
      this.$http
        .patch(
          `todos/${this.todoData._id}`,
          { completed: false },
          {
            headers: { "x-auth": this.$cookie.get("x-auth") }
          }
        )
        .then(
          res => {
            this.$emit("todoIncompleted", this.todoData._id);
          },
          err => {
            console.log(err);
          }
        );
    },
    editTodo: function() {
      this.editMode = !this.editMode;
      if (!this.editMode) {
        this.$http
          .patch(
            `todos/${this.todoData._id}`,
            { text: this.todoData.text },
            {
              headers: { "x-auth": this.$cookie.get("x-auth") }
            }
          )
          .then(
            res => {
              this.tempText;
            },
            err => {
              console.log(err);
            }
          );
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>