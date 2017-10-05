const {ObjectID} = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');


// remove all
Todo.remove({}).then((result) => {
    console.log(result);
})

// Todo.findOneAndRemove()

// Todo.findByIdAndRemove