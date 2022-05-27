const express = require('express');

const router = express.Router();

const OrderDetail = require('../models/OrderDetail');

const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    try {
        const order_detail = await OrderDetail.find();
        res.json(order_detail);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:orderDetailId', async(req, res) => {
    try {
        const order_detail = await OrderDetail.find({ _id: req.params.orderDetailId });
        res.json(order_detail);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/create', jsonParser, (req, res) => {
    const order_detail = new OrderDetail({
        product_id: req.body.product_id,
        order_id: req.body.order_id,
        subtotal: req.body.subtotal,
        quantity: req.body.quantity,
    });

    order_detail.save()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.json({ message: error });
        });
});

router.delete("/:orderDetailId", (req, res, next) => {
    OrderDetail.remove({ _id: req.params.orderDetailId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Order detail deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.patch("/:orderDetailId", jsonParser, (req, res, next) => {
    OrderDetail.updateOne(
        {_id: req.params.orderId},
        { $set: {product_id: req.body.product_id,
            order_id: req.body.order_id,
            subtotal: req.body.subtotal,
            quantity: req.body.quantity,
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