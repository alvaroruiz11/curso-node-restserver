const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoriasPorId, actulizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria, estadoCategoria } = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/categorias
//obtener todas las categorias - publico
router.get('/', obtenerCategorias );

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoriasPorId );

//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actulizar categoria - privado - cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id','No es un ID valido de Mongo').isMongoId(),
    check('id').custom( existeCategoria ),
    check('id').custom( estadoCategoria ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actulizarCategoria );

//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido de Mongo').isMongoId(),
    check('id').custom( existeCategoria ),
    check('id').custom( estadoCategoria ),
    validarCampos
], borrarCategoria );



module.exports = router;