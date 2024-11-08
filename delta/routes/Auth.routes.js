const express = require('express');
const router = express.Router()
const authController = require('../controllers/authCotroller.js')


router.post('/admin', authController.loginAdmin);

router.post('/usuario', authController.loginUsuario);

module.exports= router;