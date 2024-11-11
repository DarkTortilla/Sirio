// routes/cotizacionRoutes.js
const express = require('express');
const router = express.Router();
const CotizacionController = require('../controllers/CotizacionController');
const auth = require('../auth/auth.middleware');
const role = require('../auth/role.middleware');


router.get('/allCootizacion', CotizacionController.getAllCotizaciones);
router.get('/usuario/:idUsuario',auth, CotizacionController.getCotizacionesByUsusario);
router.post('/crearCotizacion',auth,role('user'), CotizacionController.createCotizacion);

module.exports = router;
