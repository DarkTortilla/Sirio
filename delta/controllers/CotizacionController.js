// controllers/CotizacionController.js
const Cotizacion = require('../models/Cotizacion');

exports.createCotizacion = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.create(req.body);
    res.status(201).json(cotizacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la cotización' });
  }
};

exports.getCotizacionesByUsusario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const cotizaciones = await Cotizacion.findAll({
      where:{ idUsuario }
    });

    if(cotizaciones.length===0){
      return res.status(404).json({ error: 'No se encontraron cotizaciones para el usuario especificado' });
    }
    res.status(200).json(cotizaciones)

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

}


exports.getAllCotizaciones = async (req,res)=>{
  try {
    const cotizaciones = await Cotizacion.findAll();
    
    if(cotizaciones.length===0){
      return res.status(404).json({ error: 'No se encontraron cotizaciones para el usuario especificado' });
    }

    res.status(200).json(cotizaciones);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

