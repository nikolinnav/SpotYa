const res = await fetch("http://localhost:8888/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "test",
    password: "test",
  }),
});
const data = await res.json();
const key = data.key;
const socket = new WebSocket(`ws://localhost:8888/socket?key=${key}`);

socket.addEventListener("open", () => {
  console.log("Connected");
});

socket.addEventListener("message", (event) => {
  console.log("Message from server:", event.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected");
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});
