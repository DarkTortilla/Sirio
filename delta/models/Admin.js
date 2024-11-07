const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config.js');

const Admin = sequelize.define('Admin', {
  idAdmin: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: DataTypes.STRING,
  apellidoP: DataTypes.STRING,
  apellidoM: DataTypes.STRING,
  pass: DataTypes.STRING,
  correo: DataTypes.STRING
});

module.exports = Admin;
