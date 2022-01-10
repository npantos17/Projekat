const express = require("express");
const { sequelize } = require('./models');
const msgs = require('./routes/messages');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.get("/", (req, res)=>{
    res.send("Hello worlds");
    console.log(req);
})

app.get("/test", (req, res)=>{
    res.send("Hello test");
    console.log(req);
})

app.listen(8000);