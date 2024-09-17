const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Handle the root request (optional, just to avoid the 'Cannot GET /' error)
app.get('/', (req, res) => {
  res.send("WebRTC Signaling Server is running");
});

io.on('connection', socket => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);

    socket.on('sending-signal', (payload) => {
      io.to(payload.userToSignal).emit('receiving-returned-signal', payload.signal);
    });

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', socket.id);
    });
  });
});

server.listen(5000, () => console.log('Server is running on port 5000'));
