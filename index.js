const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const users = require('./routes/users');

mongoose.connect('mongodb://localhost:auth/auth');

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
app.use('/', users);


app.listen(port, function(){
  console.log('Server listening on port:', port);
});
