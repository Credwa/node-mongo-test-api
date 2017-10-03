// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected To MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unalbe to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Craig',
    //     age: 21,
    //     location: 'Flushing'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unalbe to insert Users', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.close();
});
