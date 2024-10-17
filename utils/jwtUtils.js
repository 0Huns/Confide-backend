const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

module.exports = {
  //AccessToken 발급
  sign: (userId) => {
    const payload = {
      id: userId,
    };

    return jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "15m",
    });
  },
  //RefreshToken 발급
  refresh: (userId) => {
    const payload = {
      id: userId,
    };

    return jwt.sign(payload, REFRESH_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
  },
  //AccessToken 검증
  verify: (token) => {
    let decoded = null;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      return {
        ok: true,
        id: decoded.id,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  //RefreshToken 검증
  refreshVerify: (refreshToken) => {
    let decoded = null;
    try {
      decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      return {
        ok: true,
        id: decoded.id,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  //RefershToken 삭제
  clearRefreshTokenCookie: (res) => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
  },
};
