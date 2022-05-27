const express = require('express');

const router = express.Router();

const Order = require('../models/Order');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

var jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    try {
        const order = await Order.find();
        res.json(order);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:orderId', async(req, res) => {
    try {
        const order = await Order.find({ _id: req.params.orderId });
        res.json(order);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/create', jsonParser, (req, res) => {
    const order = new Order({
        customer_id: req.body.customer_id,
        shipping_address: req.body.shipping_address,
        date: req.body.date,
        status: req.body.status,
        amount: req.body.amount,
        total_price: req.body.total_price,
    });

    order.save()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json({ message: error });
        });
});

router.delete("/:orderId", (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.patch("/:orderId", jsonParser, (req, res, next) => {
    OrderDetail.updateOne(
        {_id: req.params.orderId},
        { $set: {customer_id: req.body.customer_id,
            shipping_address: req.body.shipping_address,
            date: req.body.date,
            status: req.body.status,
            amount: req.body.amount,
            total_price: req.body.total_price,
        } }
    )
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Order updated"
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