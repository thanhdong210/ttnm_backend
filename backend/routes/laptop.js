const express = require('express');

const router = express.Router();

const Laptop = require('../models/Laptop');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

var jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    try {
        const laptop = await Laptop.find();
        res.json(laptop);
        console.log(laptop[1]["configuration"].cpu)
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:laptopId', async(req, res) => {
    try {
        const laptop = await Laptop.find({ _id: req.params.laptopId });
        res.json(laptop);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/create', jsonParser, (req, res) => {
    Laptop.find({ name: req.body.name })
        .exec()
        .then(laptop => {
            if (laptop.length >= 1) {
                return res.status(409).json({
                    message: "laptop exists"
                })
            } else {
                const laptop = new Laptop({
                    name: req.body.name,
                    category_id: req.body.category_id,
                    price: req.body.price,
                    status: req.body.status,
                    description: req.body.description,
                    image: req.body.image,
                    brand: req.body.brand,
                    configuration: req.body.configuration,
                    characteristic: req.body.characteristic,
                });
    
                laptop.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(error => {
                        res.json({ message: error });
                    });
            }
        })
});

router.delete("/:laptopId", (req, res, next) => {
    Laptop.remove({ _id: req.params.laptopId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Laptop deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.patch("/:laptopId", jsonParser, (req, res, next) => {
    Laptop.updateOne(
        {_id: req.params.laptopId},
        { $set: {name: req.body.name,
            category_id: req.body.category_id,
            price: req.body.price,
            status: req.body.status,
            description: req.body.description,
            image: req.body.image,
            brand: req.body.brand,
            configuration: req.body.configuration,
            characteristic: req.body.characteristic,
        } }
    )
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Laptop updated"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.get('/filter/:brand', async(req, res) => {
    try {
        const laptop = await Laptop.find({ 
            brand: req.params.brand,
        });
        res.json(laptop);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;