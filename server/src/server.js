import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import app from './app';

const port = process.env.PORT || 4000;

const server = http.createServer(express());
const io = socketIo(server);

io.on('connection', socket => {
  socket.on('hello', who => console.log(`Hello World of ${who}`));
  socket.on('sendContacts', contacts => io.emit('sendContacts', contacts));
  socket.on('findCurrentUser', id => io.emit('findCurrentUser', id));
  socket.on('findUserById', response => io.emit('findUserById', response));
  socket.on('sendMessage', response => io.emit('sendMessage', response));
  socket.on('receiveMessage', response => io.emit('receiveMessage', response));
});

server.listen(port, () => {
  app.newInstance().start();
  console.log(`Listening on port ${port}`);
});
