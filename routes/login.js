require("dotenv").config();
const axios = require("axios");
const jwt = require("../utils/jwtUtils");
const { getDB } = require("../db");

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

const login = async (req, res) => {
  //클라이언트에서 인가코드 받기
  const code = req.query.code;
  try {
    //인가코드로 카카오 토큰 받아오기
    const authRes = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    const kakaoAccessToken = authRes.data.access_token;

    //카카오 토큰으로 사용자 정보 접근
    const userRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });

    const userInfo = userRes.data;
    const userId = userInfo.id;

    const db = getDB();
    let userCheck = await db.collection("users").findOne({ _id: userId });
    //사용자 ID가 DB에 없을 경우 등록
    if (!userCheck) {
      await db.collection("users").insertOne({ _id: userId });
    }

    //서비스 자체 jwt 토큰 발급
    const accessToken = jwt.sign(userId);
    const refreshToken = jwt.refresh(userId);

    //DB에 refresh-token 등록
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { refreshToken } });

    //refresh 토큰 쿠키로 전송
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    //access 토큰 json으로 전송
    res.status(200).json({
      accessToken,
      userId,
    });
  } catch (err) {
    res.status(400).send({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = login;
