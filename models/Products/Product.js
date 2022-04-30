const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
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