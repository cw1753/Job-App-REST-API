const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Username required"]
    },
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    googleId: {
        type: String,
        required: [true, "Can't be blank"],
        unique: true
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;