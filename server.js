'use strict';

// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let users = {}; // Store user connections

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('sendMessage', (message) => {
    io.emit('message', { ...message, from: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
