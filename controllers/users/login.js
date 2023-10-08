const User = require('../../models/user');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET_KEY;

const loginUser = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !user.validPassword(password)) {
      return res.status(400).json({ message: 'Incorrect login or password'});
    }
  
    const payload = { id: user._id };  
    const token = jwt.sign(payload, secret, { expiresIn: '14d' });
    user.token = token;
    await user.save();
   
    res.status(200).json({ user: { name: user.name, email: user.email, token: user.token } });

  } catch (error){
      console.error(error);
      res.status(500).json({ message: 'Server Error' }) 
  }
  };

module.exports = { loginUser }