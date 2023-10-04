const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const { generateTokens } = require('../../helpers/token');

const registerUser = async(req, res) => {
  try {           
    const { email, password, name } = req.body;
       
    const existingUser = await User.findOne({ email });
      
    if (existingUser) {
       return res.status(409).json({ message: 'Email in use' }); 
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
       
    const user = new User({
      email,
      password: hashedPassword,
      name, 
      });    
         
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);


                  
    res.status(201).json({
      accessToken,
      refreshToken,
      user,
    })          
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' }) 
    }
}

module.exports = {registerUser}