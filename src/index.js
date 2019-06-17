// @ts-nocheck
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const allowCors = require('./cors');

const app = express ();

mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb+srv://@cluster0-ejlyp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(allowCors);

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;
  res.setHeader('Access-Control-Allow-Origin', 'https://backend-instagram.herokuapp.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})
app.use(cors({ origin: 'https://backend-instagram.herokuapp.com'}));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes/routes'));

server.listen(process.env.PORT || 3300);
