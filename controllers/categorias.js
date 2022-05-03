const { request, response} = require('express');
const { Categoria } =require('../models');


//obtenerCategorias - paginado - total - populate

const obtenerCategorias = async ( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true }

    const [ total, categorias, usuario] = await Promise.all([
        Categoria.countDocuments( query),
        Categoria.find( query )
                .populate('usuario', 'nombre')
                .skip( Number( desde ) )
                .limit( Number(limite) ),
    ]);

    res.json({
        total,
        categorias,
    })


}

//obtenerCategorias - populate {}

const obtenerCategoriasPorId = async ( req = request, res = response ) => {

    const id = req.params.id;

    const catalogoPorId = await Categoria.findById( id ).populate('usuario', 'nombre');

    res.json( catalogoPorId );
    

}

const crearCategoria = async ( req, res = response ) => {

    try {
    
        const nombre = req.body.nombre.toUpperCase();

        const categoriaDB = await Categoria.findOne({ nombre });

        if( categoriaDB ){
            return res.status( 400 ).json({
                msg: `La categoria ${ categoriaDB.nombre }, ya existe`
            })
        }

        //Generar la data a guardar
        const data = { 
            nombre,
            usuario: req.usuario._id
        }

        // crea
        const categoria = new Categoria( data );
        
        //guardar DB
        await categoria.save();

        res.status(201).json( categoria );

    } catch (error) {
        console.error(error);
    }

    

}

const actulizarCategoria = async ( req= request, res = response ) => {

    const { id } = req.params;

    //evitar que req quieran actulizar el usuario, el estado
    const { _id, usuario, estado, ...data } =  req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaUpdate = await Categoria.findByIdAndUpdate( id, data, { new: true } );

    res.json( categoriaUpdate );


}

const borrarCategoria = async ( req, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json( categoria );

    

}


module.exports = {
    actulizarCategoria,
    borrarCategoria,
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriasPorId,
}