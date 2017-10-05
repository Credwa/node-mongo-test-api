const {ObjectID} = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

let id = '59d66dcf4ab8fec0c240e8dd'

if (!ObjectID.isValid(id)) {
    console.log('ID not valid')
}
Todo.findById({
    _id: id
}).then((todos) => {
    if (!todos) {
        return console.log('Id not found')
    }
    console.log('Todos :', todos)
}).catch((e) => console.log(e));
