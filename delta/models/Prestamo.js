const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config.js');

const Prestamo = sequelize.define('Prestamos', {
  idPrestamo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  interes: DataTypes.DECIMAL(5, 2),
  annos: DataTypes.INTEGER,
  enganche: DataTypes.DECIMAL(10, 2)
});

module.exports = Prestamo;