const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('Authorization header отсутствует');
    return res.sendStatus(403);
  }
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log('Access Token:', accessToken);
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // console.log('Пользователь из токена:', user);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Ошибка проверки токена:', error.message);
    res.sendStatus(403);
  }
}
function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log('Invalid refresh token');
    res.clearCookie('refreshToken').sendStatus(401);
  }
}

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
};
