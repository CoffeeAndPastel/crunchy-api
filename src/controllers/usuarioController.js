const boom = require("@hapi/boom");
const { Usuario } = require("../models/usuario");
const { IngredientesPorUsuario } = require("../models/ingredientesPorUsuario");
const { Ingrediente } = require("../models/ingrediente");
const { PlatilloPorUsuario } = require("../models/platillosPorUsuario");
const { Platillo } = require("../models/platillo");

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
        const usuario = await Usuario.findByPk(id, {
            include: [
                {
                    model: IngredientesPorUsuario,
                    as: "ingredientes",
                    include: {
                        model: Ingrediente,
                        as: "ingrediente",
                    },
                },
                {
                    model: PlatilloPorUsuario,
                    as: "platillos",
                    include: {
                        model: Platillo,
                        as: "platillo",
                    },
                },
            ],
        });
        if (!usuario) throw boom.notFound("Usuario no encontrado");

        const formatUsuario = {
            id: usuario.id,
            name: usuario.name,
            lastName: usuario.lastName,
            email: usuario.email,
            phone: usuario.phone,
            username: usuario.username,
            password: usuario.password,
            photoUrl: usuario.photoUrl,
            createdAt: usuario.createdAt,
            ingredientes: {
                muchos: [],
                pocos: [],
                nulos: [],
            },
        };

        usuario.ingredientes.map((ingrediente) => {
            const ingredientes = formatUsuario.ingredientes;
            switch (ingrediente.frequency) {
                case "mucha":
                    ingredientes.muchos.push(ingrediente.ingrediente.name);
                    break;
                case "poca":
                    ingredientes.pocos.push(ingrediente.ingrediente.name);
                    break;
                case "nula":
                    ingredientes.nulos.push(ingrediente.ingrediente.name);
                    break;
            }
        });

        formatUsuario.platillos = usuario.platillos.map(
            (platillo) => platillo.platillo.name
        );

        return formatUsuario;
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

async function createUsuarios(usuarios) {
    try {
        const createdUsuarios = await Usuario.bulkCreate(usuarios);
        return createdUsuarios;
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
    createUsuarios,
    updateUsuario,
    deleteUsuario,
};
