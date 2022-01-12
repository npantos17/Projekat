const express = require("express");
const { sequelize } = require('./models');
const cars = require('./routes/cars');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use('/api', cars);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/test', (req, res) => {
    res.sendFile('index.html');
});

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});