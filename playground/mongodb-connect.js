const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to Mongo DB');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, results) => {
        if(err){
            return console.log('Unable to insert record ', err);
        }
        console.log('record added ', JSON.stringify(results.ops, undefined, 2));
    });

    client.close();
});
