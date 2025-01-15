const jwtConfig = require('./jwtConfig');

const cookiesConfig = {
  access: {
    maxAge: jwtConfig.access.expiresIn,
    httpOnly: true,
  },
  refresh: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: true,
  },
};

module.exports = cookiesConfig;
