const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")
const moment = require("moment")

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")))
const PORT = process.env.PORT || 5000;

// pc 시간 아닌 한국 표준시 적용
// 1. pc 시간 불러오기
const curr = new Date();
// 2. UTC 시간 계산
const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
// 3. UTC를 KST로 변환 9시간 더하기
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + (KR_TIME_DIFF));


io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const {name, msg} = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(kr_curr).format("h:mm A")
    })
  })
})

httpServer.listen(PORT, () => console.log('server is running', PORT))

