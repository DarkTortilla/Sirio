require('dotenv').config();
const express = require('express');
const cors=require('cors');
const { sequelize } = require('./models');


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false }) // Usar { force: true } para recrear las tablas cada vez
  .then(() => {
    console.log("Base de datos sincronizada.");
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err);
  });



const PORT=process.env.PORT;
app.listen(PORT, ()=>{
    console.log('finux');
})


