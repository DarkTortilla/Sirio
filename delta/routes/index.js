const express = require('express');
const router = express.Router();

// Importa los archivos de rutas
const adminRouer= require('../routes/Admin.routes')
const usuariosRoutes = require('./Usuarios.routes');
const cotizacionesRoutes = require('./Cotizacion.routes');
const prestamosRoutes = require('./Prestamo.routes');
const bancoRoutes = require('./Banco.routes');
const authRoutes = require('./Auth.routes')
const bancoprestamoRoutes = require('./BancoPrestamo.routes')


// Define las rutas principales para la API
router.use('/admin', adminRouer);
router.use('/usuarios', usuariosRoutes);
router.use('/cotizaciones', cotizacionesRoutes);
router.use('/prestamos', prestamosRoutes);
router.use('/bancos', bancoRoutes);
router.use('/login', authRoutes);
router.use('/bancoprestamo',bancoprestamoRoutes);


module.exports = router;
