const Banco = require('../models/Banco');
const Prestamo= require('../models/Prestamo');
const BancoPrestamo = require('../models/BancoPrestamo')

exports.createBanco = async (req,res) =>{
    try {
        const banco = await Banco.create(req.body);
        res.status(201).json("banco creado");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAllBancos = async (req, res)=>{
    try {
        const bancos = await Banco.findAll();
        res.status(200).json(bancos);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getBancoById = async (req, res) => {
    try {
      const banco = await Banco.findByPk(req.params.idBanco);
      if (!banco) return res.status(404).json({ error: 'Banco no encontrado' });
      res.json(banco);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el banco' });
    }
  };

  exports.updateBanco = async (req, res) => {
    try {
      const updated = await Banco.update(req.body, { where: { idBanco: req.body.idBanco } });
      if (updated[0] === 0) return res.status(404).json({ error: 'Banco no encontrado' });
      res.json({ message: 'Banco actualizado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el banco' });
    }
  };
  
  exports.deleteBanco = async (req, res) => {
    try {
      console.log(req.body)
      const deleted = await Banco.destroy({ where: { idBanco: req.body.idBanco } });
      if (!deleted) return res.status(404).json({ error: 'Banco no encontrado' });
      res.json({ message: 'Banco eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el banco' });
    }
  };


  exports.getPrestamosByBanco = async (req, res) => {
    const { id } = req.params; // El idBanco que quieres consultar"
    console.log(id,"*******************************************")
  
    try {
      const banco = await Banco.findOne({
        where: { idBanco: id },
        include: [
          {
            model: Prestamo,
            through: { model: BancoPrestamo },
            attributes: ['idPrestamo', 'interes', 'annos', 'enganche'], // Selecciona los campos deseados
          }
        ]
      });
  
      if (!banco || !banco.Prestamos || banco.Prestamos.length === 0) {
        return res.status(404).json({ error: 'No se encontraron préstamos para el banco especificado' });
      }
  
      // Devuelve solo la lista de préstamos
      res.status(200).json(banco.Prestamos);
    } catch (error) {
      console.error("Error al obtener los préstamos:", error);
      res.status(500).json({ error: 'Error al obtener los préstamos del banco' });
    }
  };
  