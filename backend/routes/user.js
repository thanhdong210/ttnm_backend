const express = require('express');

const router = express.Router();

const User = require('../models/User');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

var jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:userId', async(req, res) => {
    try {
        const user = await User.find({ _id: req.params.userId });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/register', jsonParser, (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            } else {
                bcrypt.hash(req.body.email, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error:err
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: req.body.password,
                            address: req.body.address,
                            phone: req.body.phone,
                            name: req.body.name,
                        });
            
                        user.save()
                            .then(data => {
                                res.json(data);
                            })
                            .catch(error => {
                                res.json({ message: error });
                            });
                    }
                })
            }
        })
});

router.post("/login", jsonParser, (req, res) => {   
    User.find({ email: req.body.email, password: req.body.password })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                console.log("Login success")
                return res.json(user)
            } else {
                console.log("Login failed")
            }
        })
})

router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
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

router.patch("/:userId", jsonParser, (req, res, next) => {
    User.updateOne(
        {_id: req.params.userId},
        { $set: {email: req.body.email, 
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            name: req.body.name,
        } }
    )
    .exec()
    .then(result => {
        res.status(200).json({
            message: "User updated"
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