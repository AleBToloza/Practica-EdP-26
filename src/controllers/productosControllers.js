const { Producto, Categoria, Proveedor } = require('../models');


const agregarProducto = async (req, res) => {
    try {
        const {nombre, precio, stock, categoriaId} = req.body;

        if(!nombre || precio === undefined || stock === undefined) {
            return res.status(400).json({message: "Campos Incompletos"});
        }

        if (categoriaId !== undefined && categoriaId !== null) {
            const categoria = await Categoria.findByPk(categoriaId);

            if (!categoria) {
                return res.status(404).json({ message: "Categoria no encontrada" });
            }
        }

        const nuevoProducto = await Producto.create({
            nombre, precio, stock, categoriaId: categoriaId ?? null,
        });

        res.status(201).json({
            message: "Producto Agregado",
            nuevoProducto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al agregar producto"});
    }
};

const obtenerProducto = async (req, res) => { 
    try {
        const {id} = req.params;
        const producto = await Producto.findByPk(id, {
            attributes: ["id", "nombre", "precio", "stock"],
            include: [
                {
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"],
                },
                {
                model: Proveedor,
                as: "proveedores",
                attributes: ["nombre"],
                through: {attributes:[]},
                }
            ]
        });
        if (!producto) {return res.status(404).json({message: "Producto no encontrado"})};
        res.status(200).json(producto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener el producto"});
    }
    
};

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            attributes: ["id", "nombre", "precio", "stock"],
            include: [
            {
                model: Categoria,
                as: "categoria",
                attributes: ["nombre"],
            },
            {
                model: Proveedor,
                as: "proveedores",
                attributes: ["nombre"],
                through: {attributes: []},
            }]
        });

        res.status(200).json(productos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los productos"});
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, precio, stock, categoriaId } = req.body;

        const productoPrevio = await Producto.findByPk(id, {
            attributes: ["nombre", "precio", "stock", "categoriaId"]
        });
        if (!productoPrevio) { return res.json({message: "Producto Inexistente"})}

        else if(nombre == undefined || precio == undefined || stock == undefined || categoriaId == undefined) { 
            return res.json({message: "Campos Incompletos"})}

        else if (await Categoria.findByPk(categoriaId) === null) {
                return res.status(404).json({message: "Categoria no encontrada"});
        };

        await Producto.update(
            { nombre, precio, stock, categoriaId },
            { where: { id } }
        );
        const productoActualizado = await Producto.findByPk(id, {
            attributes: ["nombre", "precio", "stock", "categoriaId"]
        });
        res.json({
        "Antes": productoPrevio,
        "Después": productoActualizado
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar producto" });
    }
};

const modificarProducto = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, precio, stock, categoriaId } = req.body;
        const productoPrevio = await Producto.findByPk(id);
        if (!productoPrevio) { return res.json({message: "Producto Inexistente"})}

        else if (categoriaId !== undefined) {
            if (await Categoria.findByPk(categoriaId) === null) {
                return res.status(404).json({message: "Categoria no encontrada"});
            }
        }
        await Producto.update({
        ...(nombre !== undefined && { nombre }),
        ...(precio !== undefined && { precio }),
        ...(stock !== undefined && { stock }),
        ...(categoriaId !== undefined && {categoriaId}),
            },
        { where: {id}}
        );
        const productoActualizado = await Producto.findByPk(id);
        res.status(200).json({
        "Antes": productoPrevio,
        "Después": productoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al modificar producto" });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const {id} = req.params;
        if (await Producto.destroy({where:{id}})==0) { return res.json("Producto Inexistente"); }
        res.status(200).json({message: "Producto Eliminado:"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar producto" });
    }
};

const agregarProveedor = async (req, res) => {
  try {
    const { id, proveedorId } = req.params;

    const producto = await Producto.findByPk(id);
    const proveedor = await Proveedor.findByPk(proveedorId);
    const yaAsociado = await producto.hasProveedor(proveedor);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    else if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    else if (yaAsociado) {
      return res.status(400).json({
        message: "El proveedor ya esta asociado al producto",
      });
    }

    await producto.addProveedor(proveedor);

    res.status(200).json({
      message: "Proveedor asociado al producto correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al asociar el proveedor" });
  }
};

const quitarProveedor = async (req, res) => {
  try {
    const { id, proveedorId } = req.params;

    const producto = await Producto.findByPk(id);
    const proveedor = await Proveedor.findByPk(proveedorId);
    const estaAsociado = await producto.hasProveedor(proveedor);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    else if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    else if (!estaAsociado) {
      return res.status(404).json({
        message: "El proveedor no esta asociado al producto",
      });
    }

    await producto.removeProveedor(proveedor);

    res.status(200).json({
      message: "Proveedor desasociado del producto correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al desasociar el proveedor" });
  }
};

module.exports = {agregarProducto, obtenerProducto, obtenerProductos, actualizarProducto, modificarProducto, eliminarProducto, agregarProveedor, quitarProveedor};