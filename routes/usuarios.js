const { Router } = require('express'); 
const { check } = require('express-validator');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuarioDelete, 
    usuariosPatch } = require('../controllers/usuarios');


const router = new Router();

router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(), //verifica si es un id de mongo - no si existe el id
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );

//se manda el middlewares - que cambo del body quiere verificar ej check('correo')
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'El password debe de ser mas de 6 caracteres').isLength({ min: 6 }),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        //custom() Hace la coleccion de la DB (compara valores que esta en la base de datos)
    check('rol').custom( esRoleValido ),
    validarCampos
] , usuariosPost );emailExiste

router.patch('/', usuariosPatch );

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(), 
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuarioDelete);


module.exports = router;