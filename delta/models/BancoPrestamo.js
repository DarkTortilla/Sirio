// models/BancoPrestamo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config.js');

const BancoPrestamo = sequelize.define('BancoPrestamo', {
  idBanco: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Banco',
      key: 'id'
    }
  },
  idPrestamo: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Prestamo',
      key: 'idPrestamo'
    }
  }
});

module.exports = BancoPrestamo;
