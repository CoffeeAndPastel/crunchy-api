const boom = require("@hapi/boom");
const { Pedido } = require("../models/pedido");
const { Platillo } = require("../models/platillo");
const { PlatilloPorPedido } = require("../models/platillosPorPedido");

function formatrPedido(pedido) {
    let total = 0;
    return {
        id: pedido.id,
        state: pedido.state,
        address: pedido.address,
        createdAt: pedido.createdAt,
        platillos: pedido.platillos.map((platilloPorPedido) => {
            const platillo = platilloPorPedido.platillo;
            const subtotal = platillo.price * platilloPorPedido.amount;
            total += subtotal;
            return {
                id: platillo.id,
                name: platillo.name,
                price: platillo.price,
                amount: platilloPorPedido.amount,
                subtotal,
                photoUrl: platillo.photoUrl,
            };
        }),
        total,
    };
}

async function getAllPedidos(usuarioId) {
    try {
        const pedidos = await Pedido.findAll({
            where: { usuarioId },
            include: {
                model: PlatilloPorPedido,
                as: "platillos",
                include: {
                    model: Platillo,
                    as: "platillo",
                },
            },
        });

        const pedidosFormateados = pedidos.map(formatrPedido);

        return pedidosFormateados;
    } catch (error) {
        throw error;
    }
}

async function getPedidoById(id) {
    try {
        const pedido = await Pedido.findByPk(id, {
            include: {
                model: PlatilloPorPedido,
                as: "platillos",
                include: {
                    model: Platillo,
                    as: "platillo",
                },
            },
        });
        if (!pedido) throw boom.notFound("Pedido no encontrado");

        return formatrPedido(pedido);
    } catch (error) {
        throw error;
    }
}

async function getLastPedido(usuarioId) {
    try {
        const pedido = await Pedido.findOne({
            where: { usuarioId },
            order: [["createdAt", "DESC"]], // Ordenar por fecha de creación descendente
            include: {
                model: PlatilloPorPedido,
                as: "platillos",
                include: {
                    model: Platillo,
                    as: "platillo",
                },
            },
        });

        if (!!pedido) {
            if (pedido.state == "entregado")
                return await Pedido.create({ usuarioId });
            else return formatrPedido(pedido);
        }

        return await Pedido.create({ usuarioId });
    } catch (error) {
        throw error;
    }
}

async function createPedido(pedido) {
    try {
        const newPedido = await Pedido.create(pedido, {
            include: [{ association: "platillos" }],
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
    getLastPedido,
    createPedido,
    updatePedido,
    deletePedido,
};
