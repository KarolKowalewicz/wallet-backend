const express = require('express');

const { registerUser,
        loginUser,
        logoutUser, 
        getCurrentUser 
    } = require('../../controllers/users');
const { authenticate } = require('../../middleware/authenticate');
const { validatedBodyReg, validatedBodyLog } = require('../../middleware/validationUser');

const router = express.Router();

router.post('/register', validatedBodyReg, registerUser);
router.post('/login', validatedBodyLog, loginUser);
router.post('/logout', authenticate, logoutUser);
router.get('/profile', authenticate, getCurrentUser);

    
module.exports = router;    
