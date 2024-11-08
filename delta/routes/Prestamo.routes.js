const express = require('express');
const router = express.Router();
const PrestamoController = require('../controllers/PrestamoController');

// Ruta para crear un nuevo préstamo
router.post('/crear', PrestamoController.createPrestamo);

// Ruta para obtener todos los préstamos
router.get('/getall', PrestamoController.getAllPrestamos);

// Ruta para obtener un préstamo por ID
router.get('/getbyid/:id', PrestamoController.getPrestamoById);

// Ruta para actualizar un préstamo por ID
router.put('/update/:id', PrestamoController.updatePrestamo);

// Ruta para eliminar un préstamo por ID
router.delete('/delete/:id', PrestamoController.deletePrestamo);

// Ruta para obtener los préstamos de un cierto banco
router.get('/getByBanco/:bancoId', PrestamoController.getPrestamobyBanco);

module.exports = router;
