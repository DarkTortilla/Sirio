const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuariosController');
const auth = require('../auth/auth.middleware');
const role = require('../auth/role.middleware');

// Ruta para crear un nuevo usuario
router.post('/crear', UsuarioController.createUsuario);

// Ruta para obtener todos los usuarios
router.get('/getall',auth,role('admin'),UsuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID
router.get('/getbyid/:id', UsuarioController.getUsuarioById);

// Ruta para actualizar un usuario por ID
router.post('/update/:id', UsuarioController.updateUsuario);

// Ruta para eliminar un usuario por ID
router.post('/delete/:id', UsuarioController.deleteUsuario);

module.exports = router;
