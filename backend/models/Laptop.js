const mongoose = require('mongoose');

const LaptopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category_id: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Category",
        },
    ],
    price : {
        type: Number,
        require: true
    },
    status : {
        type: String,
        require: true
    },
    description : {
        type: String,
        require: true
    },
    image: {
        type: String,
        data: Buffer
    },
    brand: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Brand"
    },
    configuration: {
        type: mongoose.SchemaTypes.Mixed,
    },
    characteristic: {
        type: mongoose.SchemaTypes.Mixed,
    },
})

module.exports = mongoose.model('Laptop', LaptopSchema);