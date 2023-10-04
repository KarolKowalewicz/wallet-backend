const jwt = require("jsonwebtoken");
const  User  = require("../models/user"); 
require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
  
    try {
        if (bearer !== "Bearer" || !token) {
            throw new Error("Not authorized");
        }
          
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
        const  id = decodedToken.id;
              
        const user = await User.findById(id);

        if (!user || !user.token || user.token !== token) {
            throw new Error("Not authorized");
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            status: 'error',
            code: 401,
            message: error.message || 'Not authorized',
            data: 'Not authorized',
        });
    }
};

module.exports = { authenticate };