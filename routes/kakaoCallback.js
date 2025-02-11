require("dotenv").config();
require("crypto");

const kakaoCallback = async (req, res) => {
  //클라이언트에서 인가코드 받기
  const code = req.query.code;
  const state = crypto.randomBytes(16).toString("hex");
  req.session.oauthState = state;

  console.log("카카오에서 받은 code:", req.query.code);
  console.log("카카오에서 받은 state:", req.query.state);
  res.redirect(
    `https://confide-service.netlify.app/auth?code=${code}&state=${state}`
  );
};

module.exports = kakaoCallback;
