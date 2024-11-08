const express = require('express');
const router = express.Router();
const BancoController = require('../controllers/BancoController');

// Ruta para crear un nuevo banco
router.post('/crear', BancoController.createBanco);

// Ruta para obtener todos los bancos
router.get('/getall', BancoController.getAllBancos);

// Ruta para obtener un banco por ID
router.get('/getbyid/:id', BancoController.getBancoById);

// Ruta para actualizar un banco por ID
router.post('/update/:id', BancoController.updateBanco);

// Ruta para eliminar un banco por ID
router.post('/delete/:id', BancoController.deleteBanco);

module.exports = router;
