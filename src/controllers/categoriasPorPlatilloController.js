const boom = require("@hapi/boom");
const { Categoria } = require("../models/categoria");
const { CategoriasPorPlatillo } = require("../models/categoriasPorPlatillo");

async function getCategoriasPorPlatillo(platilloId) {
    try {
        const categoriasPorPlatillo = await CategoriasPorPlatillo.findAll({
            where: { platilloId },
            attributes: [],
            include: [
                {
                    model: Categoria,
                    as: "categoria",
                    attributes: ["name"],
                },
            ],
        });
        const categorias = categoriasPorPlatillo.map(
            (categoriaPorPlatillo) => categoriaPorPlatillo.categoria.name
        );
        return categorias;
    } catch (error) {
        throw error;
    }
}

async function createCategoriasPorPlatillo(categoriaPorPlatillo) {
    try {
        const { platilloId, categoriaId } = categoriaPorPlatillo;

        const existingCategoriaPorPlatillo =
            await CategoriasPorPlatillo.findOne({
                where: {
                    platilloId,
                    categoriaId,
                },
            });

        if (existingCategoriaPorPlatillo) {
            throw boom.notAcceptable(`Ya existe una esa categoria`);
        }

        const newCategoriaPorPlatillo = await CategoriasPorPlatillo.create(
            categoriaPorPlatillo
        );
        return getCategoriasPorPlatillo(platilloId);
    } catch (error) {
        throw error;
    }
}

async function deleteCategoriasPorPlatillo(platilloId, categoriaId) {
    try {
        const rowsDeleted = await CategoriasPorPlatillo.destroy({
            where: { platilloId, categoriaId },
        });
        if (rowsDeleted !== 1) throw boom.notFound("Categoría no encontrada");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCategoriasPorPlatillo,
    createCategoriasPorPlatillo,
    deleteCategoriasPorPlatillo,
};
