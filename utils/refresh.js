const { refreshVerify, sign } = require("./jwtUtils");
const { getDB } = require("../db");

const refresh = async (req, res) => {
  //쿠키에 RefreshToken 존재 확인
  if (req.headers.cookie) {
    const db = await getDB();
    //request에 userId 존재 확인
    const refreshToken = req.headers.cookie.split("refreshToken=")[1];
    const result = refreshVerify(refreshToken);
    const clientUserId = result.id;
    const user = await db.collection("users").findOne({ _id: clientUserId });
    const storedToken = user.refreshToken;
    //RefreshToken 검증 후 AccessToken 재발급
    if (result.ok === true && storedToken === refreshToken) {
      const newAccessToken = sign(clientUserId);

      res.status(200).json({
        newAccessToken,
        clientUserId,
      });
    } else {
      res.status(401).send({
        ok: false,
        message: "Invalid Refresh Token",
      });
    }
  } else {
    res.status(401).send({
      ok: false,
      message: "Access token and Refresh token are need for refresh!",
    });
  }
};

module.exports = refresh;
