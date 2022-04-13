const { Router } = require('express'); 

const { usuariosGet, usuariosPut, usuariosPost, usuarioDelete, usuariosPatch } = require('../controllers/usuarios');

const router = new Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/', usuarioDelete);


module.exports = router;