const express = require('express');

const router = express.Router();

const Brand = require('../models/Brand');

const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    try {
        const brand = await Brand.find();
        res.json(brand);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:brandId', async(req, res) => {
    try {
        const brand = await Brand.find({ _id: req.params.brandId });
        res.json(brand);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/create', jsonParser, (req, res) => {
    Brand.find({ name: req.body.name })
        .exec()
        .then(brand => {
            if (brand.length >= 1) {
                return res.status(409).json({
                    message: "Brand exists"
                })
            } else {
                const brand = new Brand({
                    name: req.body.name,
                    image: req.body.image,
                });
    
                brand.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(error => {
                        res.json({ message: error });
                    });
                
            }
        })
});

router.delete("/:brandId", (req, res, next) => {
    Brand.remove({ _id: req.params.brandId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Brand deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.patch("/:brandId", jsonParser, (req, res, next) => {
    Brand.updateOne(
        {_id: req.params.brandId},
        { $set: {name: req.body.name, 
            image: req.body.image,
        } }
    )
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Brand updated"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;