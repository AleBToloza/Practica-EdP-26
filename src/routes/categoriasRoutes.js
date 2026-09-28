const { Router } = require("express");
const router = Router();
const categoriaControllers = require("../controllers/categoriasControllers");

router.get("/", categoriaControllers.obtenerCategorias);
router.get("/:id", categoriaControllers.obtenerCategoria);
router.post("/", categoriaControllers.crearCategoria);

module.exports = router;