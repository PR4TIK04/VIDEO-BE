const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('viewer-request', (signal) => {
    // Relay viewer request to the host
    io.emit('viewer-request', signal);
  });

  socket.on('host-response', (signal) => {
    // Relay host response back to the viewer
    io.emit('host-response', signal);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => console.log('WebRTC Signaling Server is running on port 5000'));
