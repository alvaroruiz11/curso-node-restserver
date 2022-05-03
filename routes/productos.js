const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto, obtenerProductos, obtenerProducto, actulizarProducto, borrarProducto } = require('../controllers/productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');

const router = Router();



//obtener productos - publico
router.get('/', obtenerProductos );
//obtener producto - publico
router.get('/:id',[
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto );
//crear producto - privado
router.post('/',[
    validarJWT,
    check('nombre','Es obligatorio el nombre').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
] ,crearProducto);
//actulizar producto - privado
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], actulizarProducto );
//borrar producto - privado - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], borrarProducto );


module.exports = router;