const { request } = require('express');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');



const validarJWT = async ( req = request, res = response , next ) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        //verifica si es un toke valido
       const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

       // grabar uid en la req para procesar en los controladores
        //propiedad nueva en la req 
       const usuario = await Usuario.findById( uid );

       if( !usuario ){
            return res.status(401).json({
            msg:'Token no valido - usuario no existe DB'
        })
       }

       //Verificar si el uid tiene estado true
       if( !usuario.estado ){
           return res.status(401).json({
               msg:'Token no valido - usuario con estado: false'
           })
       }
       req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}