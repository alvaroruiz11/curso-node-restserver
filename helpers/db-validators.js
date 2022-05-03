const Role = require('../models/role');
const { Usuario, Categoria, Producto} = require('../models');



const esRoleValido = async (rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la DB` )
    }
}

const emailExiste = async ( correo = '' ) => {

    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El email ${ email }, ya esta registrado`);
    }    

}
const existeUsuarioPorId = async ( id ) => {

    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El id no existe ${ id }`);
    }    

}

const existeCategoria = async ( id ) => {

    const existeCategoriPorId = await Categoria.findById( id );
    if( !existeCategoriPorId ){
        throw new Error(`El id de la categoria no existe ${ id }`);
    }

}

const estadoCategoria = async ( id = '' ) =>{
    
    const estadoCategoria = await Categoria.findById( id );
    
    if( !estadoCategoria.estado ){
        throw new Error( `La categoria esta en estado: false`);
    }


    
}

const existeProducto = async ( id = '' ) => {

    const existeProductoPorId = await Producto.findById( id );
    if( !existeProductoPorId ){
        throw new Error(`El id de la producto no existe ${ id }`);
    }

}




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    estadoCategoria,
    existeProducto
}