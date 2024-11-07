// controllers/CotizacionController.js
const Cotizacion = require('../models/Cotizacion');

exports.createCotizacion = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.create(req.body);
    res.status(201).json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cotización' });
  }
};

