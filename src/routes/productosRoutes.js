const express = require('express')
const router = express.Router()

const {agregarProducto, obtenerProducto, obtenerProductos, actualizarProducto, modificarProducto, eliminarProducto, agregarProveedor, quitarProveedor} = require('../controllers/productosControllers.js');
const validarId = require("../middlewares/validarId.js");
const buscarProductoPorId = require("../middlewares/buscarProductoPorId");
const validarProducto = require("../middlewares/validarProducto");

router.post('/', validarProducto, agregarProducto);
router.get('/', obtenerProductos);
router.get('/:id', validarId, buscarProductoPorId, obtenerProducto);
router.patch('/:id', validarId, buscarProductoPorId, modificarProducto);
router.put('/:id', validarId, buscarProductoPorId, actualizarProducto);
router.delete('/:id', validarId, buscarProductoPorId, eliminarProducto);
"revisar que se puede borar en controllers, luego de agregar validar id y buscar por id"
// Rutas de la relacion muchos a muchos Producto <-> Proveedor
router.post("/:id/proveedores/:proveedorId", agregarProveedor);
router.delete("/:id/proveedores/:proveedorId", quitarProveedor);

module.exports = router;