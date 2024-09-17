const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // When a viewer requests a connection to the host
  socket.on('viewer-request', (signal) => {
    console.log('Viewer is requesting connection');
    socket.broadcast.emit('viewer-request', signal);
  });

  // When the host responds to the viewer
  socket.on('host-response', (signal) => {
    console.log('Host is responding to the viewer');
    socket.broadcast.emit('host-response', signal);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
