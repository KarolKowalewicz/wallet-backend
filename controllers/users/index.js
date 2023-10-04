const { registerUser } = require('./register');
const { loginUser } = require('./login');
const { logoutUser } = require('./logout');
const { getCurrentUser } = require('./getCurrentUser');

module.exports = { 
    registerUser,
    logoutUser,
    loginUser,
    getCurrentUser,
}