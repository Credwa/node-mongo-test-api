// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected To MongoDB server');

    db.collection('Todos').find({}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('Unable to Fetch Documents');
    });

    db.collection('Todos').find().count().then((docs) => {
        console.log(`Todos count : ${docs}`);
    }, (err) => {
        console.log('Unable to Fetch Documents');
    });

    db.close();
});
