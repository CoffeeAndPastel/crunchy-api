const boom = require("@hapi/boom");
const { Usuario } = require("../models/usuario");
const { IngredientesPorUsuario } = require("../models/ingredientesPorUsuario");
const { Ingrediente } = require("../models/ingrediente");
const { PlatilloPorUsuario } = require("../models/platillosPorUsuario");
const { Platillo } = require("../models/platillo");
const { Op } = require("sequelize");
const { getPlatillosByIds } = require("./platilloController");
const {
    PlatillosVistosPorUsuario,
} = require("../models/platillosVistosPorUsuario");
const {
    getPlatillosVistosPorUsuario,
} = require("./platillosVistosPorUsuarioController");

function formatUser(usuario) {
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

    usuario.ingredientes.forEach((ingrediente) => {
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

    formatUsuario.platillos = usuario.platillos.map((platillo) => ({
        id: platillo.platillo.id,
        name: platillo.platillo.name,
    }));

    return formatUsuario;
}

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

        return formatUser(usuario);
    } catch (error) {
        throw error;
    }
}

async function getUsuarioByUsername(username) {
    try {
        const usuario = await Usuario.findOne({
            where: {
                username,
            },
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

        return formatUser(usuario);
    } catch (error) {
        throw error;
    }
}

async function getRecommendations(id) {
    try {
        const usuario = await getUsuarioById(id);
        const platillos_id = usuario.platillos.map((platillo) => platillo.id);
        const platillosVistos = await getPlatillosVistosPorUsuario(id);

        const usuarios_match = await Usuario.findAll({
            include: {
                model: PlatilloPorUsuario,
                as: "platillos",
                where: {
                    platilloId: {
                        [Op.in]: platillos_id,
                    },
                },
            },
            where: {
                id: {
                    [Op.not]: id,
                },
            },
        });

        const usuarios_id = usuarios_match.map((usuario) => usuario.id);

        const usuarios = await Usuario.findAll({
            where: { id: usuarios_id },
            include: ["platillos"],
        });

        const usuarios_platillos_id = [];

        for (const usuario of usuarios) {
            for (const platillo of usuario.platillos) {
                if (
                    !usuarios_platillos_id.includes(platillo.platilloId) &&
                    !platillos_id.includes(platillo.platilloId)
                ) {
                    usuarios_platillos_id.push(platillo.platilloId);
                }
            }
        }

        const re = await getPlatillosByIds(usuarios_platillos_id);
        const platillosFinal = await Platillo.findAll({
            include: ["local"],
            where: {
                id: {
                    [Op.notIn]: platillosVistos.concat(re.map((x) => x.id)),
                },
            },
        });

        return platillosFinal.concat(
            re.filter((x) => !platillosVistos.includes(x.id))
        );
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
    getUsuarioByUsername,
    getRecommendations,
    createUsuario,
    createUsuarios,
    updateUsuario,
    deleteUsuario,
};
