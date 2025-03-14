const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const validateCookie = (req, next) => {
  cookieParser()(req, {}, () => {
    try {
      const { refreshToken } = req.cookies;
      const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      return next(null, user);
    } catch (error) {
      console.log('Invalid refresh token', error);
      return next(error);
    }
  });
};

module.exports = validateCookie;
