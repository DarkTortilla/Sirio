// routes/cotizacionRoutes.js
const express = require('express');
const router = express.Router();
const CotizacionController = require('../controllers/CotizacionController');



router.get('/allCootizacion', CotizacionController.getAllCotizaciones);
router.get('/usuario/:idUsuario', CotizacionController.getCotizacionesByUsusario);
router.post('/crearCotizacion', CotizacionController.createCotizacion);

module.exports = router;
