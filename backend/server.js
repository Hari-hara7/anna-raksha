const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5190", // Allow requests from the frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(cors()); // Apply CORS middleware globally

// Sample endpoint to post food
app.post('/post-food', (req, res) => {
  const { name, quantity } = req.body;

  // Broadcast notification to all connected clients
  io.emit('foodPostNotification', { name, quantity });

  res.status(200).send({ message: 'Food posted and notification sent.' });
});

// Set up a listener for new food post
io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit a welcome message to the new user
  socket.emit('foodPostNotification', { message: 'Welcome to the food post notification service!' });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
