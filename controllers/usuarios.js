const { response, request } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

 const usuariosGet =  async ( req = request, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };

    //Promise.all() todas las promesas que se mande van a ser simultaneas
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number( desde ) )
            .limit( Number(limite) )
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    //crear usuario
    const usuario = new Usuario({ nombre, correo, password, rol });
    //Encriptar la contraseña
        //genera sout(numero de vueltas hacer mas complicado la encriptacion)
    const salt = bcryptjs.genSaltSync(); 
        //hacer el has (incriptar en una sola via)
    usuario.password = bcryptjs.hashSync( password, salt );
    
    //guardar en la DB
    await usuario.save();

    res.json({
            usuario
        })  
}
const usuariosPut = async ( req, res = response ) => {

    const id = req.params.id;
    //escluir los datos que no se desea actulizar - ..resto seran actulizados
    const { _id, password, google, correo, ...resto } = req.body;
    
    if( password ){
        const salt = bcryptjs.genSaltSync(); 
        resto.password = bcryptjs.hashSync( password, salt );
    }
    //findByIdAndUpdate - Buscalo por el id y actulizalo
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario );
}
const usuariosPatch = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })

}
const usuarioDelete = async ( req, res = response ) => {

    const { id } =  req.params;
    
    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuarioDelete,

}