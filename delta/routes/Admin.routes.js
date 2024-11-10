const express = require('express')
const router= express.Router();
const Admin = require("../controllers/AdminController.js");

router.post('/create',Admin.CreateAdmin );


module.exports = router;
