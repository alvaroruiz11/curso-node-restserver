const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'Es obligatorio el nombre'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId, // relacion con categoria
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },

});

ProductoSchema.methods.toJSON = function () {
    const { __v,...producto } = this.toObject();
    return producto;
}

module.exports = model('Producto', ProductoSchema );