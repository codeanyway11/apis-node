var {mongoose} = require('../db/mongoose');


var Todo = mongoose.model('todo', {
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    compeletedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};
