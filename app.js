const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user')
const stock = require('./routes/stock')


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api',user)
app.use('/api/stock',stock)

module.exports = app;