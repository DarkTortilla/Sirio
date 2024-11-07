const sequelize = require('../config/database.config.js');
const Admin = require('./Admin.js');
const Usuario = require('./Usuario.js');
const Banco = require('./Banco.js');
const Prestamo = require('./Prestamo.js');
const BancoPrestamo = require('./BancoPrestamo.js');
const Cotizacion = require('./Cotizacion.js');


//definicion de relaciones

//para usuario
Usuario.hasMany(Cotizacion,{foreignKey:'idUsuario'});
Cotizacion.belongsTo(Usuario, {foreignKey:'idUsuario'});

//para cotizacion
Banco.hasMany(Cotizacion,{foreignKey:'idBanco'});
Cotizacion.belongsTo(Banco,{foreignKey: 'idBanco'});


//para prestamo y banco m a n a traves de BancoPrestamo
Banco.belongsToMany(Prestamo, { through: BancoPrestamo, foreignKey: 'idBanco' });
Prestamo.belongsToMany(Banco, {through: BancoPrestamo, foreignKey: 'idPrestamo' });


module.exports = {
    sequelize,
    Admin,
    Usuario,
    Banco,
    Prestamo,
    BancoPrestamo,
    Cotizacion
}

