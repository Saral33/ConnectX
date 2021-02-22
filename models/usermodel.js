const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide your username']
    },
    email:{
        type: String,
        required: [true, 'Please provide your email adress'],
        unique: true,
        validate: [validator.isEmail, 'Please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 8
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;