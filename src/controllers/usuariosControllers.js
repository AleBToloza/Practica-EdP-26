const { Usuario } = require('../models');

const agregarUsuario = async (req, res) => {
    const {nombre, email} = req.body;

    if(nombre == null || email == null) {
        return res.json({message: "Campos Incompletos"})
    }

    const nuevoUsuario = await Usuario.create({
    nombre, email
    })

    res.json({
        message: "Usuario Agregado",
        nuevoUsuario
    });
}

const obtenerUsuario = async (req, res) => { 
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id, {
        attributes: ["nombre", "email"]
    });
    if (!usuario) { return res.json({message: "Usuario no encontrado"})}
    res.json(usuario);
}

const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll()
    res.json(usuarios);
}

const actualizarUsuario = async (req, res) => {
    const {id} = req.params;
    const { nombre, email } = req.body;
    const usuarioPrevio = await Usuario.findByPk(id, {
        attributes: ["nombre", "email"]
    });
    if (!usuarioPrevio) { return res.json({message: "Usuario Inexistente"})};
    if(nombre == undefined || email == undefined) { 
        return res.json({message: "Campos Incompletos"})
    }
    await Usuario.update(
        { nombre, email },
        { where: { id } }
    );
    const usuarioActualizado = await Usuario.findByPk(id, {
        attributes: ["nombre", "email"]
    });
    res.json({
    "Antes": usuarioPrevio,
    "Después": usuarioActualizado
    });
}

const modificarUsuario = async (req, res) => {
    const {id} = req.params;
    const usuarioPrevio = await Usuario.findByPk(id, {
        attributes: ["nombre", "email"]
    });
    if (!usuarioPrevio) { return res.json({message: "Usuario Inexistente"})};
    const { nombre, email } = req.body;

    await Usuario.update({
    ...(nombre !== undefined && { nombre }),
    ...(email !== undefined && { email }),
        },
    { where: {id}}
    );
    const usuarioActualizado = await Usuario.findByPk(id, {
        attributes: ["nombre", "email"]
    });
    res.json({
    "Antes": usuarioPrevio,
    "Después": usuarioActualizado
    });
}

const eliminarUsuario = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if (await Usuario.destroy({where:{id:id}})==0) { return res.json("Usuario Inexistente"); }
    res.json({message: "Usuario Eliminado:", usuario});
}
module.exports = {agregarUsuario, obtenerUsuario, obtenerUsuarios, actualizarUsuario, modificarUsuario, eliminarUsuario}