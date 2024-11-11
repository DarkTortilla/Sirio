// models/Banco.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config.js');

const Banco = sequelize.define('Bancos', {
  idBanco: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  Telefono: DataTypes.STRING(15)
});

module.exports = Banco;
