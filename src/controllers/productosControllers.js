const { Producto } = require('../models');


const agregarProducto = async (req, res) => {
    const {nombre, precio, stock} = req.body;

    if(nombre == null || precio == null || stock == null) {
        return res.json({message: "Campos Incompletos"})
    }

    const nuevoProducto = await Producto.create({
    nombre, precio, stock
    })

    res.json({
        message: "Producto Agregado",
        nuevoProducto
    });
}

const obtenerProducto = async (req, res) => { 
    const {id} = req.params;
    const producto = await Producto.findByPk(id, {
        attributes: ["nombre", "precio", "stock"]
    });
    if (!producto) { return res.json({message: "Producto no encontrado"})}
    res.json(producto);
}

const obtenerProductos = async (req, res) => {
    const productos = await Producto.findAll()
    res.json(productos);
}

const actualizarProducto = async (req, res) => {
    const {id} = req.params;
    const { nombre, precio, stock } = req.body;

    const productoPrevio = await Producto.findByPk(id, {
        attributes: ["nombre", "precio", "stock"]
    });
    if (!productoPrevio) { return res.json({message: "Producto Inexistente"})};
    if(nombre == undefined || precio == undefined || stock == undefined) { 
        return res.json({message: "Campos Incompletos"})
    }

    await Producto.update(
        { nombre, precio, stock },
        { where: { id } }
    );
    const productoActualizado = await Producto.findByPk(id, {
        attributes: ["nombre", "precio", "stock"]
    });
    res.json({
    "Antes": productoPrevio,
    "Después": productoActualizado
    });
}

const modificarProducto = async (req, res) => {
    const {id} = req.params;
    const productoPrevio = await Producto.findByPk(id, {
        attributes: ["nombre", "precio", "stock"]
    });
    if (!productoPrevio) { return res.json({message: "Producto Inexistente"})};
    const { nombre, precio, stock } = req.body;

    await Producto.update({
    ...(nombre !== undefined && { nombre }),
    ...(precio !== undefined && { precio }),
    ...(stock !== undefined && { stock })
        },
    { where: {id}}
    );
    const productoActualizado = await Producto.findByPk(id, {
        attributes: ["nombre", "precio", "stock"]
    });
    res.json({
    "Antes": productoPrevio,
    "Después": productoActualizado
    });
}

const eliminarProducto = async (req, res) => {
    const {id} = req.params;
    const producto = await Producto.findByPk(id);
    if (await Producto.destroy({where:{id:id}})==0) { return res.json("Producto Inexistente"); }
    res.json({message: "Producto Eliminado:", producto});
}
"req.body = {nombre:..., precio: 200, stock:5}"

module.exports = {agregarProducto, obtenerProducto, obtenerProductos, actualizarProducto, modificarProducto, eliminarProducto}