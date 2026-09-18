const express = require('express')
const router = express.Router()

const {agregarUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, modificarUsuario, eliminarUsuario} = require('../controllers/usuariosControllers.js');

router.post('/', agregarUsuario);
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuario);
router.patch('/:id', modificarUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;