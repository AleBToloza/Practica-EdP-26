const { Categoria, Producto } = require("../models");

const obtenerCategorias = async (req, res) => {
  const categorias = await Categoria.findAll();
  res.status(200).json(categorias);
};

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findByPk(id, {
    include: {
      model: Producto,
      as: "productos",
      attributes: ["nombre"],
    },
  });
  res.status(200).json(categoria);
};

const crearCategoria = async (req, res) => {
  const { nombre } = req.body;
  await Categoria.create({
    nombre,
  });
  res.status(201).json({ message: "Categoria creada con exito!!!" });
};

"falta actualizar y quitar"

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
};