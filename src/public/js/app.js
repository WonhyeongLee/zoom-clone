const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("Just got this: ", message.data, "from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected");
});

setTimeout(() => {
  socket.send("hello from the browser");
}, 10000);