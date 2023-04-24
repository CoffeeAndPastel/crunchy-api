const boom = require("@hapi/boom");
const { Platillo } = require("../models/platillo");
const { PlatilloPorUsuario } = require("../models/platillosPorUsuario");

async function getPlatillosPorUsuario(usuarioId) {
    try {
        const platillosPorUsuario = await PlatilloPorUsuario.findAll({
            where: { usuarioId },
            include: [
                {
                    model: Platillo,
                    as: "platillo",
                    attributes: ["name"],
                },
            ],
        });
        const platillos = platillosPorUsuario.map((platilloPorUsuario) => {
            return platilloPorUsuario.platillo.name;
        });
        return platillos;
    } catch (error) {
        throw error;
    }
}

async function createPlatilloPorUsuario(platilloPorUsuario) {
    try {
        const { usuarioId, platilloId } = platilloPorUsuario;

        const existingPlatilloPorUsuario = await PlatilloPorUsuario.findOne({
            where: {
                usuarioId,
                platilloId,
            },
        });

        if (existingPlatilloPorUsuario) {
            throw boom.notAcceptable(`El platillo ya ha sido agregado`);
        }

        const newPlatilloPorUsuario = await PlatilloPorUsuario.create(
            platilloPorUsuario
        );
        return getPlatillosPorUsuario(usuarioId);
    } catch (error) {
        throw error;
    }
}

async function deletePlatilloPorUsuario(usuarioId, platilloId) {
    try {
        const rowsDeleted = await PlatilloPorUsuario.destroy({
            where: { usuarioId, platilloId },
        });
        if (rowsDeleted !== 1) throw boom.notFound("Platillo no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPlatillosPorUsuario,
    createPlatilloPorUsuario,
    deletePlatilloPorUsuario,
};
