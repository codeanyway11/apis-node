const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to Mongo DB');
    const db = client.db('TodoApp');

    db.collection('Todos').find().toArray().then((docs) => {
        console.log(docs);
    },
    (error)=>{
        console.log('Some error occured!');
    });

    client.close();
});
