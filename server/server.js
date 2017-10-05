const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user')

const port = process.env.PORT || 3000;
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
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    console.log(req.params);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            error: 'ID not valid'
        });
    }
    Todo.findById({ _id: id }).then((todo) => {
        if (!todo) {
            return res.status(404).send({
                error: 'Object with that ID doesn\'t exist'
            });
        }
        res.send({ todo });
    }, (e) => {
        res.status(400).send(e);
    });

});

app.delete('/todos/:id', (res, req) => {
    let id = req.req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.res.status(404).send({ error: 'bad ID' });
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.res.status(404).send({ error: 'Object with that id doesn\'t exist' });
        }
        res.res.send({ todo })
    }).catch((e) => {
        res.res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            error: 'ID not valid'
        });
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send()
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };