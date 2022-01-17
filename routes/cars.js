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
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);

route.get('/cars', (req, res) => {

    Car.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/cars/:id', (req, res) => {

    Car.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/cars', (req, res) => {

    Car.create({ brand: req.body.brand, model: req.body.model, year: req.body.year, price: req.body.price })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/cars/:id', (req, res) => {
    
    Car.findOne({ where: { id: req.params.id }})
        .then( car => {
            car.brand = req.body.brand;
            car.model = req.body.model;
            car.year = req.body.year;
            car.price = req.body.price;

            car.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/cars/:id', (req, res) => {

    Car.findOne({ where: { id: req.params.id }})
        .then( car => {
            car.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;
