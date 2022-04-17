const { Schema, model } = require('mongoose');

// {
//     nombre: '',
//     correo: 'casca@caca.com',
//     password: '12312e21e',
//     img: '13124312436',
//     role: '125423535',
//     estado: false,
//     google: false
// }
const UsarioSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'] // requerido
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'], // requerido
        unique: true //Mongo No permite correo duplicados
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'], // requerido
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true, // requerido
        emun: ['ADMIN_ROLE', 'USER_ROLE'] //validar que sea como el arreglo
        
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },

});


//metodo para modificar el toJSON sacando el __v, password
UsarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsarioSchema );