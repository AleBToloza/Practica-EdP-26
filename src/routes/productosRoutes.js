const express = require('express')
const router = express.Router()

const {agregarProducto, obtenerProducto, obtenerProductos, actualizarProducto, modificarProducto, eliminarProducto} = require('../controllers/productosControllers.js');

router.post('/', agregarProducto);
router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.patch('/:id', modificarProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;