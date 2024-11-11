// controllers/UsuarioController.js
const Usuario = require('../models/Usuario');

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUsuario = async (req, res) => {
  try {
    // Cifrar la contraseña antes de crear el usuario
    const hashedPassword = await bcrypt.hash(req.body.pass, saltRounds);

    // Crear el usuario con la contraseña cifrada
    const usuario = await Usuario.create({
      ...req.body,
      pass: hashedPassword
    });

    res.status(201).json({ msg: 'Usuario creado exitosamente', usuario });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
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
    let id;
    console.log(req.user,"***")
    if(req.user.role=="admin"){
      console.log(req.params)
      id=req.params.id;
    }
    else{
      id=req.user.id;
    }
    console.log(id)
    const usuario = await Usuario.findByPk(id);
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
    res.json({ msg: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    console.log(req.body)
    const deleted = await Usuario.destroy({ where: { idUsuario: req.body.idUsuario } });
    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ msg: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
