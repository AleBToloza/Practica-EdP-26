const Joi = require('joi')

const productoSchema = Joi.object({
    nombre: Joi.string().min(3).max(100).required(),
    precio: Joi.number().min(0).required().messages({
        "number.base": "El precio debe ser un nro válido",
        "number.min": "El precio debe ser mayor a 0",
        "any.required": "El precio es obligatorio",
    }),
    stock: Joi.number().integer().positive().required(),
    categoriaId: Joi.number().integer().positive().allow().optional(),
})

module.exports = {productoSchema,};