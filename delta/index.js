require('dotenv').config();
const express = require('express');
const cors=require('cors');
const { sequelize } = require('./models');
const routes = require('./routes/index') 

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors())
app.use('/api', routes);


// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false }) 
  .then(() => {
    console.log("El gordito");
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err);
  });



const PORT=process.env.PORT;
app.listen(PORT, ()=>{
    console.log('finux');
})


