const express = require('express');
const router = express.Router()
const authController = require('../controllers/authCotroller.js')
const auth = require('../auth/auth.middleware');
const role = require('../auth/role.middleware');


router.post('/admin', authController.loginAdmin);

router.post('/usuario', authController.loginUsuario);


router.post('/adminauth',auth, role('admin'), (req,res)=>{
    res.status(200).json('Hola guapo');
})

router.post('/adminuser',auth, role('user'), (req,res)=>{
    res.status(200).json('Hola guapo');
})

module.exports= router;