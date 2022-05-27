const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        data: Buffer
    },
})

module.exports = mongoose.model('Brand', BrandSchema);