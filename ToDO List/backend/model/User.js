const mongoose = require('mongoose');

const user_Schema = mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type: String
    },
    password:{
        type:String
    }
});

const User = mongoose.model('user', user_Schema);

module.exports = User;