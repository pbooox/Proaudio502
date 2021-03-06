const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    barCode: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    purchasePrice: {
        type: String,
        trim: true,
    },
    seller: {
        type: String,
        trim: true,
    },
    installation: {
        type: String,
        trim: true,
    },
    storePrice: {
        type: String,
        trim: true,
    },
    distPrice: {
        type: String,
        trim: true,
    },
    photo: {
        type: Array,
    },
    type: {
        type: Schema.ObjectId,
        ref: 'Type',
        required: true,
    },
    brand: {
        type: Schema.ObjectId,
        ref: 'Brand',
        required: true,
    },
    register: {
        type: Date,
        default: Date.now()
    },
    update: {
        type: Date,
        default: Date.now()
    },
    state: {
        type: Boolean,
        required: true,
        default: true,
    },
});
ProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', ProductSchema);