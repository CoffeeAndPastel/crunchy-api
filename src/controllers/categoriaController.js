const boom = require("@hapi/boom");
const { Categoria } = require("../models/categoria");

async function getAllCategorias() {
    try {
        const categorias = await Categoria.findAll();
        return categorias;
    } catch (error) {
        throw error;
    }
}

async function getCategoriaById(id) {
    try {
        const categoria = await Categoria.findByPk(id, {
            include: [
                {
                    model: Platillo,
                    as: "platillos",
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        if (!categoria) throw boom.notFound("Categoría no encontrada");

        return categoria;
    } catch (error) {
        throw error;
    }
}

async function createCategoria(categoria) {
    try {
        const newCategoria = await Categoria.create(categoria);
        return newCategoria;
    } catch (error) {
        throw error;
    }
}

async function updateCategoria(id, categoria) {
    try {
        const [rowsUpdated, [updatedCategoria]] = await Categoria.update(
            categoria,
            {
                returning: true,
                where: { id },
            }
        );
        if (rowsUpdated !== 1) throw boom.notFound("Categoría no encontrada");

        return updatedCategoria;
    } catch (error) {
        throw error;
    }
}

async function deleteCategoria(id) {
    try {
        const rowsDeleted = await Categoria.destroy({ where: { id } });
        if (rowsDeleted !== 1) throw boom.notFound("Categoría no encontrada");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
};
