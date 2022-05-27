const express = require('express');

const router = express.Router();

const Category = require('../models/Category');

const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:categoryId', async(req, res) => {
    try {
        const category = await Category.find({ _id: req.params.categoryId });
        res.json(category);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/create', jsonParser, (req, res) => {
    Category.find({ name: req.body.name })
        .exec()
        .then(category => {
            if (category.length >= 1) {
                return res.status(409).json({
                    message: "Category exists"
                })
            } else {
                const category = new Category({
                    name: req.body.name,
                });
    
                category.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(error => {
                        res.json({ message: error });
                    });
                
            }
        })
});

router.delete("/:categoryId", (req, res, next) => {
    Category.remove({ _id: req.params.categoryId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.patch("/:categoryId", jsonParser, (req, res, next) => {
    Category.updateOne(
        {_id: req.params.categoryId},
        { $set: {name: req.body.name, 
        } }
    )
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Category updated"
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