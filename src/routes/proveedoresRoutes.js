const { Router } = require("express");
const router = Router();
const proveedorController = require("../controllers/proveedoresControllers");

router.get("/", proveedorController.obtenerProveedores);
router.get("/:id", proveedorController.obtenerProveedor);
router.post("/", proveedorController.crearProveedor);

module.exports = router;