const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const refreshToken = require('../utils/refresh');

router.use('/user', userRouter);
router.use('/auth', loginRouter);
router.use('/logout', logoutRouter);
router.post('/refresh', refreshToken);

module.exports = router;