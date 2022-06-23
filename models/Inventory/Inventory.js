const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const InventorySchema = mongoose.Schema({
    price: {
        type: String,
        required: true,
    },
    minimalPrice: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true,
    },
    store: {
        type: Schema.ObjectId,
        ref: 'Store',
        required: true,
    },
    product: {
        type: Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    employee: {
        type: Schema.ObjectId,
        ref: 'Employees',
        required: false,
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
InventorySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Inventory', InventorySchema);