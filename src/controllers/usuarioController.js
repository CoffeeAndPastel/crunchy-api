const boom = require("@hapi/boom");
const { Usuario } = require("../models/usuario");

async function getAllUsuarios() {
    try {
        const usuarios = await Usuario.findAll();
        return usuarios;
    } catch (error) {
        throw error;
    }
}

async function getUsuarioById(id) {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw boom.notFound("Usuario no encontrado");

        return usuario;
    } catch (error) {
        throw error;
    }
}

async function createUsuario(usuario) {
    try {
        const newUsuario = await Usuario.create(usuario);
        return newUsuario;
    } catch (error) {
        throw error;
    }
}

async function updateUsuario(id, usuario) {
    try {
        const [rowsUpdated, [updatedUsuario]] = await Usuario.update(usuario, {
            returning: true,
            where: { id },
        });
        if (rowsUpdated !== 1) throw boom.notFound("Usuario no encontrado");

        return updatedUsuario;
    } catch (error) {
        throw error;
    }
}

async function deleteUsuario(id) {
    try {
        const rowsDeleted = await Usuario.destroy({ where: { id } });
        if (rowsDeleted !== 1) throw boom.notFound("Usuario no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};
