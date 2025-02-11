require("dotenv").config();
const axios = require("axios");
const jwt = require("../utils/jwtUtils");
const { getDB } = require("../db");

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

const kakaoAuth = async (req, res) => {
  try {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    res.status(200).json({ kakaoAuthUrl });
  } catch (error) {
    res.status(500).json({ message: "카카오 로그인 URL 생성 중 오류 발생" });
  }
};

module.exports = kakaoAuth;
