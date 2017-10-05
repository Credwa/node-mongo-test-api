const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user')

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    console.log(req.body);

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(404).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(404).send(e);
    });
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };