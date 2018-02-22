const expect = require('expect');
const request = require('supertest')
const { ObjectID } = require('mongodb');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const Todos = [{
    _id : new ObjectID,
    text: 'First'
}, {
    _id : new ObjectID,
    text: 'second'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(Todos);
    }).then(() => {
        done();
    })
})

describe(' POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo app';
        request(app)
        .post('/todos')
        .send({ text })
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        })
    })

    it('should neot create body with invalid data ', (done) => {
        var text ='';
        request(app)
        .post('/todos')
        .send({text})
        .expect(404)
        .expect((res) => {
        })
        .end((err, res) => {
            if(err){
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((err) => done(err));
        })

    })
});


describe('GET todos' , ()=>{
    it('should get all todos' , (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    });
})


describe('GET a particular id', ()=>{
    it('shoudl returna  particular id ', (done) => {
        request(app)
        .get(`/todos/${Todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(Todos[0].text);
        })
        .end(done);
    })

    it('should return 404 if todo not found', (done)=> {
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`todos/${hexId}`)
        .expect(404)
        .end(done);

    })

    it('should return 404 for non object IDS ', (done) => {
        request(app)
        .get('/todos/123ab')
        .expect(404)
        .end(done);
    })

})
