require("dotenv").config();
const crypto = require("crypto");
const { getDB } = require("../db");

const kakaoCallback = async (req, res) => {
  //클라이언트에서 인가코드 받기
  const db = getDB();
  const code = req.query.code;
  const state = crypto.randomBytes(16).toString("hex");
  await db.collection("session").insertOne({ state: state });

  res.redirect(
    `https://confide-service.netlify.app/auth?code=${code}&state=${state}`
  );
};

module.exports = kakaoCallback;
