const Banco = require('../models/Banco');
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
      const banco = await Banco.findByPk(req.params.id);
      if (!banco) return res.status(404).json({ error: 'Banco no encontrado' });
      res.json(banco);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el banco' });
    }
  };

  exports.updateBanco = async (req, res) => {
    try {
      const updated = await Banco.update(req.body, { where: { id: req.params.id } });
      if (updated[0] === 0) return res.status(404).json({ error: 'Banco no encontrado' });
      res.json({ message: 'Banco actualizado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el banco' });
    }
  };
  
  exports.deleteBanco = async (req, res) => {
    try {
      const deleted = await Banco.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Banco no encontrado' });
      res.json({ message: 'Banco eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el banco' });
    }
  };