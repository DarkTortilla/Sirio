const express = require('express');
const router = express.Router();
const BancoController = require('../controllers/BancoController');
const auth = require('../auth/auth.middleware');
const role = require('../auth/role.middleware');

// Ruta para crear un nuevo banco
router.post('/crear',auth,role('admin'), BancoController.createBanco);

// Ruta para obtener todos los bancos
router.get('/getall', BancoController.getAllBancos);

// Ruta para obtener un banco por ID
router.get('/getbyid/:id', BancoController.getBancoById);

// Ruta para actualizar un banco por ID
router.post('/update',auth,role('admin'), BancoController.updateBanco);

// Ruta para eliminar un banco por ID
router.post('/delete',auth,role('admin'), BancoController.deleteBanco);


router.get('/getByBanco/:id',auth, BancoController.getPrestamosByBanco);


module.exports = router;