// models/BancoPrestamo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config.js');

const BancoPrestamo = sequelize.define('BancoPrestamos', {
  idBanco: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Bancos',
      key: 'idBanco'
    }
  },
  idPrestamo: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Prestamos',
      key: 'idPrestamo'
    }
  }
});

module.exports = BancoPrestamo;
