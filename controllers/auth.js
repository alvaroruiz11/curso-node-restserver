const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario =  require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async ( req, res = response ) => {
    
    const { correo, password } = req.body;
    
    try {

        //verificar si el email existe

        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no es correcto - correo'
            });
        }

        //SI el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no es correcto - estado: false'
            });
        }

        //verificar la contraseña
            //compareSync compara el password encriptada
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no es correcto - password'
            });
        }

        //Generar el JWT

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.error(error);
        res.status( 500 ).json({
            msg:'Hable con el administrador'
        })
    }


}

module.exports = {
    login
}