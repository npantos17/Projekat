const express = require('express');
const { sequelize, Car } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

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
