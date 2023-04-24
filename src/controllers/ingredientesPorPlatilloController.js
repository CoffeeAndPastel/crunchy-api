const boom = require("@hapi/boom");
const { Ingrediente } = require("../models/ingrediente");
const {
    IngredientesPorPlatillo,
} = require("../models/ingredientesPorPlatillo");

async function getIngredientesPorPlatillo(platilloId) {
    try {
        const ingredientesPorPlatillo = await IngredientesPorPlatillo.findAll({
            where: { platilloId },
            attributes: ["isOptional"],
            include: [
                {
                    model: Ingrediente,
                    as: "ingrediente",
                },
            ],
        });
        const ingredientes = ingredientesPorPlatillo.map(
            (ingredientePorPlatillo) => ({
                name: ingredientePorPlatillo.ingrediente.name,
                isOptional: ingredientePorPlatillo.isOptional,
            })
        );
        return ingredientes;
    } catch (error) {
        throw error;
    }
}

async function createIngredientesPorPlatillo(ingredientePorPlatillo) {
    try {
        const { platilloId, ingredienteId } = ingredientePorPlatillo;

        const existingIngredientePorPlatillo =
            await IngredientesPorPlatillo.findOne({
                where: {
                    platilloId,
                    ingredienteId,
                },
            });

        if (existingIngredientePorPlatillo) {
            throw boom.notAcceptable(`Ya existe ese ingrediente`);
        }

        const newIngredientePorPlatillo = await IngredientesPorPlatillo.create(
            ingredientePorPlatillo
        );
        return getIngredientesPorPlatillo(platilloId);
    } catch (error) {
        throw error;
    }
}

async function deleteIngredientesPorPlatillo(platilloId, ingredienteId) {
    try {
        const rowsDeleted = await IngredientesPorPlatillo.destroy({
            where: { platilloId, ingredienteId },
        });
        if (rowsDeleted !== 1) throw boom.notFound("Ingrediente no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getIngredientesPorPlatillo,
    createIngredientesPorPlatillo,
    deleteIngredientesPorPlatillo,
};
