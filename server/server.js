var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/User');

var app = express();
app.listen(3000, () => {
    console.log('started at 3000');
});

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    var newtodo = new Todo({
        text: req.body.text
    });
    newtodo.save().then((doc) => {
        res.send(doc);
        console.log(doc);
    }, (error) => {
        res.status(404).send(error);
        console.log(error);
    });
    // res.send('Done');
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(404).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({});
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send({});
        }
        return res.send({todo});
    }, (e) =>{
        return res.status(404).send({});
    })
});


module.exports = { app };

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//     console.log(doc);
// }, (err) => {
//
// });
//
// var newUser = new User({
//     email: 'c@navgurukul.org',
//     password: 'rishabh sucks'
// });
//
// newUser.save().then((doc) => {
//     console.log(doc);
// })
