const { Router } = require('express')
const router = Router();
require("dotenv").config();
 
const videogames = require('./videogames.js');


router.use('/videogames', videogames);

 
 module.exports = router;