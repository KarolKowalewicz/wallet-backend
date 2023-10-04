const User = require('../../models/user');
const { generateTokens } = require('../../helpers/token');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || !(await user.validPassword(password))) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect login or password',
        data: 'Bad request',
      });
    }

  console.log(user)
  
  const { accessToken, refreshToken } = generateTokens(user._id);
   
    res.json({
      accessToken,
      refreshToken,
      user,
    });

  } catch (error){
      console.error(error);
      res.status(500).json({ message: 'Server Error' }) 
  }
  };

module.exports = { loginUser }