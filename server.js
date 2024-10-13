require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const { getDB } = require("./db");
const router = require("./routes");
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "https://confide-service.netlify.app/",
    credentials: true,
  })
);

app.use(express.json());

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`http://localhost:${PORT} 에서 서버 실행 중`)
  );
};

app.use("/", router);

startServer();
