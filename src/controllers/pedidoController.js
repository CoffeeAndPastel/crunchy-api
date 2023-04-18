const boom = require("@hapi/boom");
const { Pedido } = require("../models/pedido");

async function getAllPedidos() {
    try {
        const pedidos = await Pedido.findAll({
            include: [{ association: "usuario" }, { association: "platillos" }],
        });
        return pedidos;
    } catch (error) {
        throw error;
    }
}

async function getPedidoById(id) {
    try {
        const pedido = await Pedido.findByPk(id, {
            include: [{ association: "usuario" }, { association: "platillos" }],
        });
        if (!pedido) throw boom.notFound("Pedido no encontrado");

        return pedido;
    } catch (error) {
        throw error;
    }
}

async function createPedido(pedido) {
    try {
        const newPedido = await Pedido.create(pedido, {
            include: [{ association: "usuario" }, { association: "platillos" }],
        });
        return newPedido;
    } catch (error) {
        throw error;
    }
}

async function updatePedido(id, pedido) {
    try {
        const [rowsUpdated, [updatedPedido]] = await Pedido.update(pedido, {
            returning: true,
            where: { id },
        });
        if (rowsUpdated !== 1) throw boom.notFound("Pedido no encontrado");

        return updatedPedido;
    } catch (error) {
        throw error;
    }
}

async function deletePedido(id) {
    try {
        const rowsDeleted = await Pedido.destroy({ where: { id } });
        if (rowsDeleted !== 1) throw boom.notFound("Pedido no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
};
