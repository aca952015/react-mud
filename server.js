'use strict';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');
const message = require('./sockets/message.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/build`));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

const users = {};

io.on('connection', socket => {
  users[socket.id] = socket;
  socket.join('nexus');

  message(socket);
});

server.listen(PORT);
