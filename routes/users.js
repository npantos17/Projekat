const express = require('express');
const { sequelize, User,Car } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: 'err' });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: 'err' });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/users', (req, res) => {
    User.findOne({ where: { id: req.user.userId } })
    .then(usr => {
        if(usr.admin){
            User.findAll()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        }else{
            res.status(403).json({ msg: "Invalid credentials"});
            //window.location.href = 'index.html';
        }
    })
    
});

route.get('/users/:id', (req, res) => {

    User.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/users', (req, res) => {

    User.create({ name: req.body.name, email: req.body.email, email: req.body.email, password: req.body.password })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/users/:id', (req, res) => {
    
    User.findOne({ where: { id: req.params.id }})
        .then( usr => {
            usr.name = req.body.name;
            usr.email = req.body.email;
            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/users/:id', (req, res) => {

    User.findOne({ where: { id: req.params.id }})
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;