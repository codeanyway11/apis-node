var {mongoose} = require('../db/mongoose');

var User = mongoose.model('user', {
    email: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = {
    User
};
