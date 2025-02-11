require("dotenv").config();

const kakaoCallback = async (req, res) => {
  if (!req.query.code) {
    if (!res.headersSent) {
      return res.status(400).json({ error: "카카오 로그인 코드 없음" });
    }
  }

  console.log("카카오에서 받은 code:", req.query.code);
  console.log("카카오에서 받은 state:", req.query.state);

  if (!res.headersSent) {
    res.redirect(
      `https://confide-service.netlify.app/auth?code=${req.query.code}&state=${req.query.state}`
    );
  }
};

module.exports = kakaoCallback;
