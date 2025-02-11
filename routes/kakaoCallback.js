require("dotenv").config();

const kakaoCallback = async (req, res) => {
  //클라이언트에서 인가코드 받기
  const code = req.query.code;
  const state = crypto.randomBytes(16).toString("hex");
  req.session.oauthState = state;
  res.redirect(
    `https://confide-service.netlify.app/auth?code=${code}&state=${state}`
  );
};

module.exports = kakaoCallback;
