const validarId = (req,res,next) => {
     const {id} = req.params
     const idNumero = Number(id);
     if(!Number.isInteger(idNumero) || idNumero < 0) {
        return res.status(400).json({message: "El id debe ser un nro entero y positivo"});
     }

     next()
};

module.exports = validarId;