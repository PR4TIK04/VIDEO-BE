const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('viewer-request', (signal) => {
    io.emit('viewer-request', signal);
  });

  socket.on('host-response', (signal) => {
    io.emit('host-response', signal);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => console.log('WebRTC Signaling Server is running on port 5000'));
