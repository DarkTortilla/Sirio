const express = require('express');
const router = express.Router();
const auth = require('../auth/auth.middleware');
const role = require('../auth/role.middleware');
const bancoprestamo= require('../controllers/BancoPrestamoController');


router.post('/crear', bancoprestamo.create);



module.exports =router;


