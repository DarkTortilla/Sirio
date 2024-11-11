const BancoPrestamo = require("../models/BancoPrestamo");

exports.create = async (req, res)=>{
    try {
        const bancoprestamo = await BancoPrestamo.create(req.body);
        res.status(201).json(bancoprestamo);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear la cotización' });
      }
}