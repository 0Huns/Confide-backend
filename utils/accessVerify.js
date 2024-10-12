const { verify } = require('./jwtUtils');

const accessVerify = (req, res, next) => {
  //request header에 AccessToken 존재 확인
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = verify(token);
    //AccessToken 검증 확인
    if (result.ok) {
      req.id = result.id;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  } else {
    res.status(401).send({
      ok: false,
      message: 'Token refresh loss',
    });
  }
};

module.exports = accessVerify;
