const Admin = require('../models/Admin.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.CreateAdmin = async (req,res)=>{    
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass, saltRounds);

        const usuario = await Admin.create({
            ...req.body,
            pass:hashedPassword
        }) 

        res.status(201).json({message: 'Admin creado con exito'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

} 
