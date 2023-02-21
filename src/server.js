import express from "express";
import http from "http";
import WebSocket from "ws";
const app = express();

console.log("heeeeello");
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];
// 같은 서버에 http, webSocket 둘 다 작동시키는 형태

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function onSubmitMessage(msg, socket) {
  const message = JSON.parse(msg);
  switch (message.type) {
    case "new_message":
      console.log(socket.nickname, message.payload);
      sockets.forEach((aSocket) =>
        aSocket.send(makeMessage("new_message", `${socket.nickname}: ${message.payload}`))
      );
      break;
    case "nickname":
      socket["nickname"] = message.payload;
      socket.send(makeMessage("nickname", socket.nickname));
      break;
  }
}

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "익명";
  socket.send(makeMessage("nickname", socket.nickname));
  console.log("Connected to Server");
  socket.on("close", () => {
    console.log("Disconnected from the Browser");
    // sockets.splice(sockets.indexOf(socket), 1);
  });
  socket.on("message", (msg) => onSubmitMessage(msg, socket));
});
server.listen(3000, handleListen);
