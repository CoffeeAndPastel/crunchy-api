const boom = require("@hapi/boom");
const { Local } = require("../models/local");

async function getAllLocales() {
    try {
        const locales = await Local.findAll();
        return locales;
    } catch (error) {
        throw error;
    }
}

async function getLocalById(id) {
    try {
        const local = await Local.findByPk(id, { include: "platillos" });
        if (!local) throw boom.notFound("Local no encontrado");

        return local;
    } catch (error) {
        throw error;
    }
}

async function createLocal(local) {
    try {
        const newLocal = await Local.create(local);
        return newLocal;
    } catch (error) {
        throw error;
    }
}

async function createLocales(locales) {
    try {
        const createdLocales = await Local.bulkCreate(locales);
        return createdLocales;
    } catch (error) {
        throw error;
    }
}

async function updateLocal(id, local) {
    try {
        const [rowsUpdated, [updatedLocal]] = await Local.update(local, {
            returning: true,
            where: { id },
        });
        if (rowsUpdated !== 1) throw boom.notFound("Local no encontrado");

        return updatedLocal;
    } catch (error) {
        throw error;
    }
}

async function deleteLocal(id) {
    try {
        const rowsDeleted = await Local.destroy({ where: { id } });
        if (rowsDeleted !== 1) throw boom.notFound("Local no encontrado");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllLocales,
    getLocalById,
    createLocal,
    createLocales,
    updateLocal,
    deleteLocal,
};
