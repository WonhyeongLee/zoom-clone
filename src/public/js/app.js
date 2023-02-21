// socketIO 사용한 프런트코드
const socket = io();

const welcomeDiv = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
  console.log(`server : ${msg}`);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("lobby", input.value, backendDone);
  //function must be last argu
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
