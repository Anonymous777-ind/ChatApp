// .env file configuration

// packages 
const express = require("express");
const http = require("http");
const cors = require('cors');
// const { Server } = require("socket.io");

// import express from "express";
// import http from "http";
// import cors from "cors";
// import {Server as SocketIO} from "socket.io";

require('dotenv').config();

// modules
const { connectDB } = require('./db/database');
const userRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 8080;

// instantiation
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:4200/'
  }
});

// middlewares
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// api used
app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.send('working');
})

// socket
io.on('connection', (socket) => {
  console.log('a user connected!');

  socket.on('message', (msg) => {
    console.log(msg)
    io.emit('newmessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected!')
  });
})

server.listen(PORT, () => {
  console.log(`Server is listening to the port: ${PORT}`)
});