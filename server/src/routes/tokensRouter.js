const { Router } = require('express');
const { verifyRefreshToken } = require('../middlewares/verifyTokens');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const tokensRouter = Router();

tokensRouter.get('/refresh', verifyRefreshToken, async (req, res) => {
  try {
    const { user } = res.locals;

    if (!user) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    const { accessToken, refreshToken } = generateTokens({ user });
    res.cookie('refreshToken', refreshToken, cookiesConfig).json({ user, accessToken });
  } catch (error) {
    console.error('Ошибка при обновлении токенов:', error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении токенов' });
  }
});

module.exports = tokensRouter;
