const boom = require("@hapi/boom");
const { Etiqueta } = require("../models/etiqueta");
const { EtiquetasPorPlatillo } = require("../models/etiquetasPorPlatillo");

async function getEtiquetasPorPlatillo(platilloId) {
    try {
        const etiquetasPorPlatillo = await EtiquetasPorPlatillo.findAll({
            where: { platilloId },
            attributes: [],
            include: [
                {
                    model: Etiqueta,
                    as: "etiqueta",
                    attributes: ["name"],
                },
            ],
        });
        const etiquetas = etiquetasPorPlatillo.map(
            (etiquetaPorPlatillo) => etiquetaPorPlatillo.etiqueta.name
        );
        return etiquetas;
    } catch (error) {
        throw error;
    }
}

async function createEtiquetasPorPlatillo(etiquetaPorPlatillo) {
    try {
        const { platilloId, etiquetaId } = etiquetaPorPlatillo;

        const existingEtiquetaPorPlatillo = await EtiquetasPorPlatillo.findOne({
            where: {
                platilloId,
                etiquetaId,
            },
        });

        if (existingEtiquetaPorPlatillo) {
            throw boom.notAcceptable(`Ya existe esa etiqueta`);
        }

        const newEtiquetaPorPlatillo = await EtiquetasPorPlatillo.create(
            etiquetaPorPlatillo
        );
        return getEtiquetasPorPlatillo(platilloId);
    } catch (error) {
        throw error;
    }
}

async function deleteEtiquetasPorPlatillo(platilloId, etiquetaId) {
    try {
        const rowsDeleted = await EtiquetasPorPlatillo.destroy({
            where: { platilloId, etiquetaId },
        });
        if (rowsDeleted !== 1) throw boom.notFound("Etiqueta no encontrada");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getEtiquetasPorPlatillo,
    createEtiquetasPorPlatillo,
    deleteEtiquetasPorPlatillo,
};
