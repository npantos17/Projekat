const express = require('express');
const { sequelize, User,Seller } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
        return res.status(401).json({ msg: 'Token je null' });
        
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: 'err' });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/sellers', (req, res) => {

    Seller.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/sellers/:id', (req, res) => {

    Seller.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/sellers', (req, res) => {

    Seller.create({ name: req.body.name, email: req.body.email, address: req.body.address, rating: req.body.rating })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/sellers/:id', (req, res) => {
    
    Seller.findOne({ where: { id: req.params.id }})
        .then( seller => {
            seller.name = req.body.name;
            seller.email = req.body.email;
            seller.address = req.body.address;
            seller.rating = req.body.rating;

            seller.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/sellers/:id', (req, res) => {

    Seller.findOne({ where: { id: req.params.id }})
        .then( seller => {
            seller.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;
