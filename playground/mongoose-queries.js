const {mongoose} = require('./../server/db/mongoose');
const {Todo}  = require('./../server/models/todo');

var id = '5a8e42eca8a55d7787cd48d0';

Todo.find({
    _id: id
}).then((todos) => {
    if(!todos){
        console.log('Todos not found!!');
    }
    console.log('Todos   ', todos);
}, (e) => {
    console.log(e);
})

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todos   ', todo);
})
