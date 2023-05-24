const boom = require("@hapi/boom");
const { PlatilloPorPedido } = require("../models/platillosPorPedido");
const { getPedidoById } = require("./pedidosPorUsuarioController");

async function createPlatilloPorPedido(platilloPorPedido) {
    try {
        const { pedidoId, platilloId } = platilloPorPedido;

        const existingPlatilloPorPedido = await PlatilloPorPedido.findOne({
            where: { pedidoId, platilloId },
        });

        if (existingPlatilloPorPedido) {
            await PlatilloPorPedido.update(
                { amount: existingPlatilloPorPedido.amount + 1 },
                {
                    where: { pedidoId, platilloId },
                }
            );
        } else await PlatilloPorPedido.create(platilloPorPedido);

        return getPedidoById(pedidoId);
    } catch (error) {
        throw error;
    }
}

async function updatePlatillosPorPedido(pedidoId, platilloId, amount) {
    try {
        const [rowsUpdated, [updatePlatillo]] = await PlatilloPorPedido.update(
            amount,
            {
                returning: true,
                where: { platilloId, pedidoId },
            }
        );
        if (rowsUpdated !== 1) throw boom.notFound("Platillo no encontrado");

        return updatePlatillo;
    } catch (error) {
        throw error;
    }
}

async function deletePlatillosPorPedido(platilloId, pedidoId) {
    try {
        const rowsDeleted = await PlatilloPorPedido.destroy({
            where: { platilloId, pedidoId },
        });
        if (rowsDeleted !== 1) throw boom.notFound("Platillo no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPlatilloPorPedido,
    updatePlatillosPorPedido,
    deletePlatillosPorPedido,
};
