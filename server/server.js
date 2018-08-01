require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const path = require("path");
const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { authenticate } = require("./middleware/authenticate");

const port = process.env.PORT || 3000;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/../"));

console.log(__dirname + "/../dist/");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  res.header("x-auth", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth"
  );
  next();
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../index.html"));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname + "/../index.html"));
});

app.get("/signup", function(req, res) {
  res.sendFile(path.join(__dirname + "/../index.html"));
});

app.get("/main", function(req, res) {
  res.sendFile(path.join(__dirname + "/../index.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname + "/../index.html"));
});

app.post("/todos", authenticate, (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  if (_.isBoolean(req.body.completed) && req.body.completed) {
    todo.completedAt = new Date().getTime();
    todo.completed = true;
  } else {
    todo.completed = false;
    todo.completedAt = null;
  }

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(404).send(e);
    }
  );
});

app.get("/todos", authenticate, (req, res) => {
  console.log(1);
  Todo.find({
    _creator: req.user._id
  }).then(
    todos => {
      console.log(todos);
      res.send({ todos });
    },
    e => {
      console.log(e);
      res.status(400).send(e);
    }
  );
});

app.get("/todos/:id", authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: "ID not valid"
    });
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then(
    todo => {
      if (!todo) {
        return res.status(404).send({
          error: "Object with that ID doesn't exist"
        });
      }
      res.send({ todo });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete("/todos/:id", authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ error: "bad ID" });
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      if (!todo) {
        return res
          .status(404)
          .send({ error: "Object with that id doesn't exist" });
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.patch("/todos/:id", authenticate, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: "ID not valid"
    });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.post("/users", (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);
  let user = new User(body);

  user
    .save()
    .then(() => {
      res.status(200).send();
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.post("/users/login", (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header("x-auth", token).send({ user, token });
      });
    })
    .catch(e => {
      res.status(404).send();
    });
});

app.delete("/users/me/token", authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
