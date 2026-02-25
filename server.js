const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for frontend
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

let queue = [];
let currentServing = null;
let tokenCounter = 1;

// Register patient
app.post("/register", (req, res) => {
  const { name, phone, priority, department } = req.body;
  const token = tokenCounter++;

  const patient = { token, name, phone, priority, department };

  // Insert emergency patients at the top
  if(priority === "Emergency"){
    queue.unshift(patient);
  } else {
    queue.push(patient);
  }

  io.emit("queueUpdate", queue);
  res.status(200).json({ message: "Registered", token });
});

// Serve next patient
app.post("/serveNext", (req, res) => {
  if(queue.length === 0){
    return res.status(400).json({ message: "Queue empty" });
  }

  currentServing = queue.shift();
  io.emit("queueUpdate", queue);
  io.emit("currentServing", currentServing);

  // Optional: send SMS logic can go here if API available
  console.log(`Serving token #${currentServing.token} - ${currentServing.name}`);

  res.status(200).json({ message: "Serving next patient", currentServing });
});

// Get queue (optional)
app.get("/queue", (req, res) => {
  res.json(queue);
});

// Start server
const PORT = 7000;

server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("New client connected");
  // Send initial queue and current serving
  socket.emit("queueUpdate", queue);
  socket.emit("currentServing", currentServing);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});