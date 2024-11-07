// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config.js');

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  apellidoP: DataTypes.STRING,
  apellidoM: DataTypes.STRING,
  RFC: DataTypes.STRING(13),
  edad: DataTypes.INTEGER,
  fechaAlta: DataTypes.DATE,
  telefono: DataTypes.STRING(15),
  pass: DataTypes.STRING,
  sueldo: DataTypes.DECIMAL(10, 2),
  correo: DataTypes.STRING
});

module.exports = Usuario;
