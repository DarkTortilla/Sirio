const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config.js')


const Cotizacion = sequelize.define("Cotizacion", {
    idCotizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    valorCasa: DataTypes.DECIMAL(15, 2),
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuario',
            key: 'idUsuario'
        },
    },
    idBanco: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Banco',
            key: 'id'
        }
    },
    annos: DataTypes.INTEGER,
    interes: DataTypes.DECIMAL(5, 2),
    enganche: DataTypes.DECIMAL(10, 2),
    mensualidad: DataTypes.DECIMAL(10, 2),
    montoaPagar: DataTypes.DECIMAL(15, 2),
    meses: DataTypes.INTEGER,
    tasaAnual: DataTypes.DECIMAL(5, 2)

})

module.exports=Cotizacion;