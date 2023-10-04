const express = require('express');

const { registerUser,
        loginUser,
        logoutUser, 
        getCurrentUser 
    } = require('../../controllers/users');
const { authenticate } = require('../../middleware/authenticate');
const { userValidation, validationEmail } = require('../../middleware/validationUser');

const router = express.Router();

router.post('/register', userValidation, registerUser);
router.post('/login', validationEmail, loginUser);
router.post('/logout', authenticate, logoutUser);
//router.post('/refresh', authenticate, refreshToken);
router.get('/profile', authenticate, getCurrentUser);

    
module.exports = router;    
