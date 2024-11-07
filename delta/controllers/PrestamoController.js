// controllers/PrestamoController.js
const Prestamo = require('../models/Prestamo');

exports.createPrestamo = async (req, res) => {
  try {
    const prestamo = await Prestamo.create(req.body);
    res.status(201).json(prestamo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el préstamo' });
  }
};

exports.getAllPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll();
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los préstamos' });
  }
};

exports.getPrestamoById = async (req, res) => {
  try {
    const prestamo = await Prestamo.findByPk(req.params.id);
    if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el préstamo' });
  }
};

exports.updatePrestamo = async (req, res) => {
  try {
    const updated = await Prestamo.update(req.body, { where: { idPrestamo: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json({ message: 'Préstamo actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el préstamo' });
  }
};

exports.deletePrestamo = async (req, res) => {
  try {
    const deleted = await Prestamo.destroy({ where: { idPrestamo: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Préstamo no encontrado' });
    res.json({ message: 'Préstamo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el préstamo' });
  }
};
