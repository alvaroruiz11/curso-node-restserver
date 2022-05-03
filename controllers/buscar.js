const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'ususarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async ( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const ususario = await Usuario.findById( termino );

        return res.json({
            results: ( ususario ) ? [ ususario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const ususario = await Usuario.find({
        $or: [{ nombre: regex } , { correo: regex } ],
        $and: [{ estado: true }]
    });

    res.json({ 
        results: ususario
    });
}
const buscarCategorias = async ( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const categoria = await Categoria.findById( termino );

        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categoria = await Categoria.find({ nombre: regex, estado: true });

    res.json({ 
        results: categoria
    });
}
const buscarProductos = async ( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const producto = await Producto.findById( termino ).populate('categoria', 'nombre');

        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const producto = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre');

    res.json({ 
        results: producto
    });
}


const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({ 
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch ( coleccion ) {
        case 'ususarios' :
            buscarUsuarios( termino, res );
            break;
        case 'categoria' :
            buscarCategorias( termino, res );
            break;
        case 'productos' :
            buscarProductos( termino, res );
            break;

            default:
                res.status(500).json({
                    msg: 'Se le olvido hacer la busqueda'
                })
        }

}


module.exports = {
    buscar
}