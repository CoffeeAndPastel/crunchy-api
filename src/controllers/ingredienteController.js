const boom = require("@hapi/boom");
const { Ingrediente } = require("../models/ingrediente");

async function getAllIngredientes() {
    try {
        const ingredientes = await Ingrediente.findAll();
        return ingredientes;
    } catch (error) {
        throw error;
    }
}

async function getIngredienteById(id) {
    try {
        const ingrediente = await Ingrediente.findByPk(id, {
            include: [
                {
                    association: "ingredientesPorPlatillo",
                    include: ["platillo"],
                },
                {
                    association: "ingredientesPorUsuario",
                    include: ["usuario"],
                },
            ],
        });
        if (!ingrediente) throw boom.notFound("Ingrediente no encontrado");

        return ingrediente;
    } catch (error) {
        throw error;
    }
}

async function createIngrediente(ingrediente) {
    try {
        const newIngrediente = await Ingrediente.create(ingrediente);
        return newIngrediente;
    } catch (error) {
        throw error;
    }
}

async function updateIngrediente(id, ingrediente) {
    try {
        const [rowsUpdated, [updatedIngrediente]] = await Ingrediente.update(
            ingrediente,
            {
                returning: true,
                where: { id },
            }
        );
        if (rowsUpdated !== 1) throw boom.notFound("Ingrediente no encontrado");

        return updatedIngrediente;
    } catch (error) {
        throw error;
    }
}

async function deleteIngrediente(id) {
    try {
        const rowsDeleted = await Ingrediente.destroy({ where: { id } });
        if (rowsDeleted !== 1) throw boom.notFound("Ingrediente no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllIngredientes,
    getIngredienteById,
    createIngrediente,
    updateIngrediente,
    deleteIngrediente,
};
