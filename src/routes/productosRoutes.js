const express = require('express')
const router = express.Router()

const {agregarProducto, obtenerProducto, obtenerProductos, actualizarProducto, modificarProducto, eliminarProducto, agregarProveedor, quitarProveedor} = require('../controllers/productosControllers.js');

router.post('/', agregarProducto);
router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.patch('/:id', modificarProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

// Rutas de la relacion muchos a muchos Producto <-> Proveedor
router.post("/:id/proveedores/:proveedorId", agregarProveedor);
router.delete("/:id/proveedores/:proveedorId", quitarProveedor);

module.exports = router;