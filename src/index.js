// @ts-nocheck
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000

const conectionDB = process.env.MONGO_URL || 'mongodb+srv://backend:10Sistem@s@cluster0-ejlyp.mongodb.net/test?retryWrites=true&w=majority'

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect( conectionDB,  { useNewUrlParser: true } );
app.use((req, res, next) => {
  req.io = io;
  next();
})
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes/routes'));

server.listen(PORT);