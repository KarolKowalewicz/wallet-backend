/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email address of the user.
 *         password:
 *           type: string
 *           description: Hashed password of the user.
 *         name:
 *           type: string
 *           description: Name of the user.
 *         token:
 *           type: string
 *           description: JWT token associated with the user (optional).
 */

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
    token: {
      type: String,
      default: null,
    },  
})

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;