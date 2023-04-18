const boom = require("@hapi/boom");
const { Etiqueta } = require("../models/etiqueta");

async function getAllEtiquetas() {
    try {
        const etiquetas = await Etiqueta.findAll();
        return etiquetas;
    } catch (error) {
        throw error;
    }
}

async function getEtiquetaById(id) {
    try {
        const etiqueta = await Etiqueta.findByPk(id, {
            include: "etiquetasPorPlatillo",
        });
        if (!etiqueta) throw boom.notFound("Etiqueta no encontrada");

        return etiqueta;
    } catch (error) {
        throw error;
    }
}

async function createEtiqueta(etiqueta) {
    try {
        const newEtiqueta = await Etiqueta.create(etiqueta);
        return newEtiqueta;
    } catch (error) {
        throw error;
    }
}

async function updateEtiqueta(id, etiqueta) {
    try {
        const [rowsUpdated, [updatedEtiqueta]] = await Etiqueta.update(
            etiqueta,
            {
                returning: true,
                where: { id },
            }
        );
        if (rowsUpdated !== 1) throw boom.notFound("Etiqueta no encontrada");

        return updatedEtiqueta;
    } catch (error) {
        throw error;
    }
}

async function deleteEtiqueta(id) {
    try {
        const rowsDeleted = await Etiqueta.destroy({ where: { id } });
        if (rowsDeleted !== 1) throw boom.notFound("Etiqueta no encontrada");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllEtiquetas,
    getEtiquetaById,
    createEtiqueta,
    updateEtiqueta,
    deleteEtiqueta,
};
