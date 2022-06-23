const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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
StoreSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Store', StoreSchema);