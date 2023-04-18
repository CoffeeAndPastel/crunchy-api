const boom = require("@hapi/boom");
const { Platillo } = require("../models/platillo");

async function getAllPlatillos() {
    try {
        const platillos = await Platillo.findAll();
        return platillos;
    } catch (error) {
        throw error;
    }
}

async function getPlatilloById(id) {
    try {
        const platillo = await Platillo.findByPk(id, {
            include: [
                "local",
                "pedidos",
                "categoriasPorPlatillo",
                "etiquetasPorPlatillo",
                "ingredientesPorPlatillo",
            ],
        });
        if (!platillo) throw boom.notFound("Platillo no encontrado");

        return platillo;
    } catch (error) {
        throw error;
    }
}

async function createPlatillo(platillo) {
    try {
        const newPlatillo = await Platillo.create(platillo);
        return newPlatillo;
    } catch (error) {
        throw error;
    }
}

async function updatePlatillo(id, platillo) {
    try {
        const [rowsUpdated, [updatedPlatillo]] = await Platillo.update(
            platillo,
            {
                returning: true,
                where: { id },
            }
        );
        if (rowsUpdated !== 1) throw boom.notFound("Platillo no encontrado");

        return updatedPlatillo;
    } catch (error) {
        throw error;
    }
}

async function deletePlatillo(id) {
    try {
        const rowsDeleted = await Platillo.destroy({ where: { id } });
        if (rowsDeleted !== 1) throw boom.notFound("Platillo no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPlatillos,
    getPlatilloById,
    createPlatillo,
    updatePlatillo,
    deletePlatillo,
};
