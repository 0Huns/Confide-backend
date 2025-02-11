const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const kakaoAuthRouter = require("./kakaoAuth");
const kakaoCallbackRouter = require("./kakaoCallback");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const refreshToken = require("../utils/refresh");

router.use("/user", userRouter);
router.use("/kakaoAuth", kakaoAuthRouter);
router.use("/auth", kakaoCallbackRouter);
router.use("/loginAuth", loginRouter);
router.use("/logout", logoutRouter);
router.post("/refresh", refreshToken);

module.exports = router;
