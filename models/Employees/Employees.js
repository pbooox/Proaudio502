const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const EmployeesSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    secondName: {
        type: String,
        trim: true,
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
    },
    mail: {
        type: String,
        trim: true,
    },
    cui: {
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
EmployeesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Employees', EmployeesSchema);