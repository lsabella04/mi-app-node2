const Profesor = require('../models/profesores');

const ProfesorService = {
    findAll: async () => {
        return await Profesor.find();
    },

    findById: async (id) => {
        return await Profesor.findById(id);
    },

    create: async (profesorData) => {
        const nuevoProfesor = new Profesor(profesorData);
        return await nuevoProfesor.save();
    },

    update: async (id, profesorData) => {
        return await Profesor.findByIdAndUpdate(id, profesorData, { new: true, runValidators: true });
    },

    delete: async (id) => {
        return await Profesor.findByIdAndDelete(id);
    }
};

module.exports = ProfesorService;