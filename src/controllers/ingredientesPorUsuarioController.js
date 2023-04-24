const boom = require("@hapi/boom");
const { Ingrediente } = require("../models/ingrediente");
const { IngredientesPorUsuario } = require("../models/ingredientesPorUsuario");

async function getIngredientesPorUsuario(usuarioId) {
    try {
        const ingredientesPorUsuario = await IngredientesPorUsuario.findAll({
            where: { usuarioId },
            attributes: ["frequency"],
            include: [
                {
                    model: Ingrediente,
                    as: "ingrediente",
                    attributes: ["name"],
                },
            ],
        });
        const ingredientes = ingredientesPorUsuario.map(
            (ingredientePorUsuario) => {
                return {
                    name: ingredientePorUsuario.ingrediente.name,
                    frequency: ingredientePorUsuario.frequency,
                };
            }
        );
        return ingredientes;
    } catch (error) {
        throw error;
    }
}

async function createIngredientePorUsuario(ingredientePorUsuario) {
    try {
        const { usuarioId, ingredienteId } = ingredientePorUsuario;

        const existingIngredientePorUsuario =
            await IngredientesPorUsuario.findOne({
                where: {
                    usuarioId,
                    ingredienteId,
                },
            });

        if (existingIngredientePorUsuario) {
            throw boom.notAcceptable(`El ingrediente ya ha sido agregado`);
        }

        const newIngredientePorUsuario = await IngredientesPorUsuario.create(
            ingredientePorUsuario
        );
        return getIngredientesPorUsuario(usuarioId);
    } catch (error) {
        throw error;
    }
}

async function deleteIngredientePorUsuario(usuarioId, ingredienteId) {
    try {
        const rowsDeleted = await IngredientesPorUsuario.destroy({
            where: { usuarioId, ingredienteId },
        });
        if (rowsDeleted !== 1) throw boom.notFound("Ingrediente no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getIngredientesPorUsuario,
    createIngredientePorUsuario,
    deleteIngredientePorUsuario,
};
