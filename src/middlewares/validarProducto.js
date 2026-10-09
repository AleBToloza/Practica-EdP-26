const {productoSchema} = require("../schemas/productoSchemas");

const validarProducto = (req, res, next) => {
    const {error} = productoSchema.validate(req.body);
    if(error) {
        return res.status(400).json({message: "Datos invalidos", error: error.details[0].message});
    }
    next();
};

module.exports = validarProducto;