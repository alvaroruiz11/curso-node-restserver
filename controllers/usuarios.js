const { response, request } = require('express')


 const usuariosGet = (req = request, res = response ) => {
    
    const { q, nombre, page = 1, limit } = req.query;

    res.json({
        ok: true,
        msg: 'get API - controlador', 
        q, nombre, page, limit
    })
}

const usuariosPost = (req, res = response ) => {

    const body = req.body;

    res.json({
            ok: true,
            msg: 'post API - controlador',
            body
        }) 
    }
const usuariosPut = (req, res = response ) => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    })
}
const usuariosPatch = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })

}
const usuarioDelete = (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'delet API - controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuarioDelete,

}