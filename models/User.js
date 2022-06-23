const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const UsersSchema = mongoose.Schema({
    user: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
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
    type: {
        type: Array,
        required: true
    },
    employee: {
        type: Schema.ObjectId,
        ref: 'Employees',
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
        default: true,
    }
});
UsersSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Users', UsersSchema);