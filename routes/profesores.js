const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesores');

router.route('/')
    .get(profesorController.getProfesores)  
    .post(profesorController.createProfesor); 

router.route('/:id')
    .get(profesorController.getProfesor) 
    .put(profesorController.editProfesor) 
    .delete(profesorController.deleteProfesor);

module.exports = router;