const boom = require("@hapi/boom");
const { Pedido } = require("../models/pedido");
const { Platillo } = require("../models/platillo");
const { PlatilloPorPedido } = require("../models/platillosPorPedido");

async function getAllPlatillosPorPedido() {
    try {
        const platillosPorPedido = await PlatilloPorPedido.findAll({
            include: [
                { model: Pedido, as: "pedido" },
                { model: Platillo, as: "platillo" },
            ],
        });
        return platillosPorPedido;
    } catch (error) {
        throw error;
    }
}

async function getPlatilloPorPedidoById(id) {
    try {
        const platilloPorPedido = await PlatilloPorPedido.findByPk(id, {
            include: [
                { model: Pedido, as: "pedido" },
                { model: Platillo, as: "platillo" },
            ],
        });
        if (!platilloPorPedido)
            throw boom.notFound("Platillo por pedido no encontrado");

        return platilloPorPedido;
    } catch (error) {
        throw error;
    }
}

async function createPlatilloPorPedido(platilloPorPedido) {
    try {
        const newPlatilloPorPedido = await PlatilloPorPedido.create(
            platilloPorPedido
        );
        return newPlatilloPorPedido;
    } catch (error) {
        throw error;
    }
}

async function updatePlatilloPorPedido(id, platilloPorPedido) {
    try {
        const [rowsUpdated, [updatedPlatilloPorPedido]] =
            await PlatilloPorPedido.update(platilloPorPedido, {
                returning: true,
                where: { id },
            });
        if (rowsUpdated !== 1)
            throw boom.notFound("Platillo por pedido no encontrado");

        return updatedPlatilloPorPedido;
    } catch (error) {
        throw error;
    }
}

async function deletePlatilloPorPedido(id) {
    try {
        const rowsDeleted = await PlatilloPorPedido.destroy({ where: { id } });
        if (rowsDeleted !== 1)
            throw boom.notFound("Platillo por pedido no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPlatillosPorPedido,
    getPlatilloPorPedidoById,
    createPlatilloPorPedido,
    updatePlatilloPorPedido,
    deletePlatilloPorPedido,
};
