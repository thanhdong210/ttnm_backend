const mongoose = require('mongoose');

const OrderDetailSchema = mongoose.Schema({
    product_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Laptop",
    },
    order_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order",
    },
    subtotal : {
        type: Number,
        require: true
    },
    quantity : {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);