const mongoose = require('mongoose');
const bCrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },    
})

userSchema.methods.validPassword = async function (password) {
    const result = await bCrypt.compare(password, this.password)
    console.log(result)
    return result
}

const User = model('user', userSchema);

module.exports = User;