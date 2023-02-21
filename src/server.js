import express from "express";
import http from "http";
import SocketIO from "socket.io";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

io.on("connection", (socket) => {
  socket.on("lobby", (roomName, done) => {
    console.log(roomName);
    setTimeout(() => {
      done("Timeout - "); //frontend에서 인자로 받은 함수를 실행시킴
    }, 10000);
  });
});
