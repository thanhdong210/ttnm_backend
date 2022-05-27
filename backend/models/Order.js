const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    shipping_address: {
        type: String,
        require: true
    },
    date : {
        type: Date,
        default: Date.now()
    },
    status : {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    total_price: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Order', OrderSchema);