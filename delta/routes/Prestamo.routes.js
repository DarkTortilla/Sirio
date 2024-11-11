const express = require('express');
const router = express.Router();
const PrestamoController = require('../controllers/PrestamoController');
const auth = require('../auth/auth.middleware');
const role = require('../auth/role.middleware');

// Ruta para crear un nuevo préstamo
router.post('/crear',auth,role('admin'), PrestamoController.createPrestamo);

// Ruta para obtener todos los préstamos
router.get('/getall',auth, PrestamoController.getAllPrestamos);

// Ruta para obtener un préstamo por ID
router.get('/getbyid/:id',auth, PrestamoController.getPrestamoById);

// Ruta para actualizar un préstamo por ID
router.put('/update/:id',auth,role('admin'), PrestamoController.updatePrestamo);

// Ruta para eliminar un préstamo por ID
router.delete('/delete/:id',auth,role('admin'), PrestamoController.deletePrestamo);

// Ruta para obtener los préstamos de un cierto banco


module.exports = router;
