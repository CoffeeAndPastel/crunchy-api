const boom = require("@hapi/boom");
const { Platillo } = require("../models/platillo");
const {
    PlatillosVistosPorUsuario,
} = require("../models/platillosVistosPorUsuario");

async function getPlatillosVistosPorUsuario(usuarioId) {
    try {
        const platillosPorUsuario = await PlatillosVistosPorUsuario.findAll({
            where: { usuarioId },
            include: [
                {
                    model: Platillo,
                    as: "platillo",
                    attributes: ["id"],
                },
            ],
        });
        const platillos = platillosPorUsuario.map((platilloPorUsuario) => {
            return platilloPorUsuario.platillo.id;
        });
        return platillos;
    } catch (error) {
        throw error;
    }
}

async function createPlatillosVistosPorUsuario(platilloPorUsuario) {
    try {
        const { usuarioId, platilloId } = platilloPorUsuario;

        const existingPlatilloPorUsuario =
            await PlatillosVistosPorUsuario.findOne({
                where: {
                    usuarioId,
                    platilloId,
                },
            });

        if (existingPlatilloPorUsuario) {
            throw boom.notAcceptable("El platillo ya ha sido agregado");
        }

        const newPlatilloPorUsuario = await PlatillosVistosPorUsuario.create(
            platilloPorUsuario
        );
        return getPlatillosVistosPorUsuario(usuarioId);
    } catch (error) {
        throw error;
    }
}

async function deletePlatillosVistosPorUsuario(usuarioId, platilloId) {
    try {
        const rowsDeleted = await PlatillosVistosPorUsuario.destroy({
            where: { usuarioId, platilloId },
        });
        if (rowsDeleted !== 1) {
            throw boom.notFound("Platillo no encontrado");
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPlatillosVistosPorUsuario,
    createPlatillosVistosPorUsuario,
    deletePlatillosVistosPorUsuario,
};
