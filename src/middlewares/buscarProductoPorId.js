const { Producto, Proveedor, Categoria } = require('../models');

const buscarProductoPorId = async (req,res,next) => {
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
        req.producto = producto;
        next();
    }catch (error) {
            console.error(error);
            res.status(500).json({message: "Error al obtener el producto"});
        }
        
};

module.exports = buscarProductoPorId;