const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const UsuariosSchema = mongoose.Schema({
    user: {
        type: String,
        trim: true,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now()
    },
    actualizacion: {
        type: Date,
        default: Date.now()
    },
    empleado: {
        type: Schema.ObjectId,
        ref: 'Empleados',
        required: true,
    }
});
UsuariosSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Usuarios', UsuariosSchema);