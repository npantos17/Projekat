const express = require("express");
const { sequelize } = require('./models');
const cars = require('./routes/cars');
const orders = require('./routes/orders')
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use('/api', cars);
//app.use('/api', orders)

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});


app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});