const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario =  require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');




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

const googleSignIn  = async ( req, res = response ) => {

    const { id_token } = req.body;

    try {
        
        const { correo, nombre, img, rol } = await googleVerify( id_token );
        
        

        let usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            //Tengo que crearlo
            const data = { 
                nombre, 
                correo,
                rol: 'USER_ROLE',
                password: ':p',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario en DB
        if( !usuario.estado ){
            return res.status( 401 ).json({ 
                msg:'Hable con el administrador, usuario bloqueado'
            });
        }


        const token = await generarJWT( usuario.id );
        
        res.json({
            token,
            usuario
        })

    } catch (error) {
        res.status( 400 ).json({
            ok: false, 
            msg: 'El token no se pudo verificar'
        })

    }


}

module.exports = {
    login,
    googleSignIn 
}