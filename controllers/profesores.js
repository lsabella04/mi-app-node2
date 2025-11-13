const ProfesorService = require('../services/profesores');

const profesorController = {
    getProfesores: async (req, res) => {
        try {
            const profesores = await ProfesorService.findAll();
            return res.status(200).json(profesores);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener profesores', error: error.message });
        }
    },

    getProfesor: async (req, res) => {
        try {
            const profesor = await ProfesorService.findById(req.params.id);
            if (!profesor) {
                return res.status(404).json({ message: 'Profesor no encontrado' });
            }
            return res.status(200).json(profesor);
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(404).json({ message: 'ID de profesor inválido' });
            }
            return res.status(500).json({ message: 'Error al obtener profesor', error: error.message });
        }
    },

    createProfesor: async (req, res) => {
        try {
            const nuevoProfesor = await ProfesorService.create(req.body);
            return res.status(201).json(nuevoProfesor); // 201 Created
        } catch (error) {

            if (error.name === 'ValidationError' || error.code === 11000) {
                return res.status(400).json({ message: 'Error de validación o duplicidad', error: error.message });
            }
            return res.status(500).json({ message: 'Error al crear profesor', error: error.message });
        }
    },

    editProfesor: async (req, res) => {
        try {
            const profesorActualizado = await ProfesorService.update(req.params.id, req.body);
            if (!profesorActualizado) {
                return res.status(404).json({ message: 'Profesor no encontrado para actualizar' });
            }
            return res.status(200).json(profesorActualizado);
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(404).json({ message: 'ID de profesor inválido' });
            }
            if (error.name === 'ValidationError' || error.code === 11000) {
                return res.status(400).json({ message: 'Error de validación o duplicidad', error: error.message });
            }
            return res.status(500).json({ message: 'Error al actualizar profesor', error: error.message });
        }
    },

    deleteProfesor: async (req, res) => {
        try {
            const profesorEliminado = await ProfesorService.delete(req.params.id);
            if (!profesorEliminado) {
                return res.status(404).json({ message: 'Profesor no encontrado para eliminar' });
            }
            // 204 No Content indica éxito sin cuerpo de respuesta
            return res.status(200).json({ message: 'Profesor eliminado correctamente' });
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(404).json({ message: 'ID de profesor inválido' });
            }
            return res.status(500).json({ message: 'Error al eliminar profesor', error: error.message });
        }
    }
};

module.exports = profesorController;