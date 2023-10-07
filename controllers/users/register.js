const User = require('../../models/user');

const registerUser = async(req, res) => {
  try {           
    const { email, password, name } = req.body;
       
    const existingUser = await User.findOne({ email });
      
    if (existingUser) {
       return res.status(409).json({ message: 'Email in use' }); 
    }
     
    const user = new User({ email, name,}); 
    user.setPassword(password);
         
    await user.save();
             
    res.status(201).json({ user: { name: user.name, email: user.email } })          
  } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' }) 
  }
}

module.exports = {registerUser}