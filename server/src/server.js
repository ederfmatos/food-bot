import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import app from './app';

const port = process.env.PORT || 4000;

const server = http.createServer(express());
const io = socketIo(server); // < Interesting!

io.on('connection', socket => {
  console.log('New client connected');
});

server.listen(port, () => {
  app.newInstance().start();
  console.log(`Listening on port ${port}`);
});
