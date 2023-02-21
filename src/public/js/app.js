const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const currentNick = document.querySelector("#current-nickname");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}
socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log(message.data);
  const { type, payload } = JSON.parse(message.data);
  console.log(type, payload);
  switch (type) {
    case "new_message":
      addMessage(payload);
      break;
    case "nickname":
      setNickname(payload);
      break;
    default:
      console.error("Unknown message type:", type);
  }
});

socket.addEventListener("close", () => {
  console.log("Disconnected");
});

function addMessage(message) {
  const li = document.createElement("li");
  li.innerText = message;
  messageList.append(li);
}
function setNickname(nickname) {
  currentNick.innerText = nickname;
}

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
