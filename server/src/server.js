import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import app from './app';

const port = process.env.PORT || 4000;

const server = http.createServer(express());
const io = socketIo(server); // < Interesting!

io.on('connection', socket => {
  socket.on('hello', who => console.log(`Hello World of ${who}`));

  socket.on('sendContacts', contacts => io.emit('sendContacts', contacts));
});

server.listen(port, () => {
  app.newInstance().start();
  console.log(`Listening on port ${port}`);
});
