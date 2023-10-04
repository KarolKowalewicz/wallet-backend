const jwt = require('jsonwebtoken');

const generateAccessToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '14d' });
};

const generateRefreshToken = id => {
  return jwt.sign({ id, type: 'refresh' }, process.env.JWT_SECRET_KEY, { expiresIn: '14d'});
};

const generateTokens = id => {
  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};