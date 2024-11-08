// controllers/UsuarioController.js
const Usuario = require('../models/Usuario');

exports.createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const updated = await Usuario.update(req.body, { where: { idUsuario: req.params.id } });
    if (updated[0] === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.destroy({ where: { idUsuario: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
