const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Admin = require('../models/Admin');
const { config } = require('dotenv');
require('dotenv').config()
const secretKey = process.env.JWT_KEY;

// Login para Usuario
const loginUsuario = async (req, res) => {
    const { correo, pass } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(pass, usuario.pass);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario.idUsuario, role: 'user' }, secretKey, { expiresIn: '1h' });

        res.json({ msg: 'Inicio de sesión exitoso', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Login para Admin
const loginAdmin = async (req, res) => {
    const { correo, pass } = req.body;

    try {
        const admin = await Admin.findOne({ where: { correo } });
        if (!admin) {
            return res.status(400).json({ msg: 'Administrador no encontrado' });
        }

        const isMatch = await bcrypt.compare(pass, admin.pass);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: admin.idAdmin, role: 'admin' }, secretKey, { expiresIn: '1h' });

        res.json({ msg: 'Inicio de sesión exitoso', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = { loginUsuario, loginAdmin };
