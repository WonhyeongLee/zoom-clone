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
// 같은 서버에 http, webSocket 둘 다 작동시키는 형태

function onSubmitMessage(message) {
  console.log("received: %s", message);
}

wss.on("connection", (socket) => {
  console.log("Connected to Server");
  socket.on("close", () => console.log("Disconnected from the Browser"));
  socket.on("message", onSubmitMessage);
  socket.send("hello!!");
});
server.listen(3000, handleListen);
