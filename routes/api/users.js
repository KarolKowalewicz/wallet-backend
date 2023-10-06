const express = require('express');

const { registerUser,
        loginUser,
        logoutUser, 
        getCurrentUser 
    } = require('../../controllers/users');
const { authenticate } = require('../../middleware/authenticate');
const { validatedBodyReg, validatedBodyLog } = require('../../middleware/validationUser');

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided email, password, and name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 user:
 *                   $ref: './models/user.js'
 *       '409':
 *         description: Conflict. Email is already in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
 
router.post('/register', validatedBodyReg, registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [success]
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 user:
 *                   $ref: './models/user.js'
 *       '400':
 *         description: Bad request. Incorrect login or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [error]
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 */

router.post('/login', validatedBodyLog, loginUser);


/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logout the currently authenticated user.
 *     responses:
 *       '204':
 *         description: User successfully logged out.
 *       '401':
 *         description: Unauthorized. User not authorized.
 *       '500':
 *         description: Internal Server Error.
 */
router.post('/logout', authenticate, logoutUser);


/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get current user profile
 *     description: Retrieve the profile of the currently authenticated user.
 *     responses:
 *       '200':
 *         description: Current user profile successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user
 *       '401':
 *         description: Unauthorized. User not authorized.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/current', authenticate, getCurrentUser);

    
module.exports = router;    
