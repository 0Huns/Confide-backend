const { clearRefreshTokenCookie } = require('../utils/jwtUtils');
const { getDB } = require('../db');

const logout = async (req, res) => {
 //쿠키에 RefreshToken 존재 확인
 try{
   const db = await getDB();
   //request에 RefreshToken이 있을 경우
   if(req.headers.cookie){
    const refreshToken = req.headers.cookie.split('refreshToken=')[1];
    await db.collection('users').updateOne({ refreshToken }, { $unset: { refreshToken: "" } });
    clearRefreshTokenCookie(res);
    return res.status(200).send({
      ok: true,
      message: 'Logged out successfully!',
    });
   }else if(req.body.userId){//request에 userId가 있을 경우
    const userId = Number(req.body.userId);
    const user = await db.collection('users').findOne({_id : userId });
    if (user) {//DB에 userId가 있을 경우
      await db.collection('users').updateOne({ _id : userId }, { $unset: { refreshToken: "" } });
      clearRefreshTokenCookie(res);
      return res.status(200).send({
        ok: true,
        message: 'Logged out successfully!',
      });
    } else {
      // userId로 사용자를 찾지 못한 경우
      throw new Error('User not found with provided userId.');
    }
  } else {
    // 쿠키와 userId 모두 없는 경우
    throw new Error('Refresh token and userId are missing in request.');
  }
 }catch(error){
    clearRefreshTokenCookie(res);
    res.status(401).send({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = logout;
