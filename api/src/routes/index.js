const { Router } = require('express')
const router = Router();
require("dotenv").config();
 
const videogames = require('./videogames.js');
const videogame = require('./videogame');
const genres = require('./genres')
//const createVideogame = require('./createVideogame.js')

router.use('/videogames', videogames);
router.use('/videogame', videogame);
router.use('/genres', genres); 
//router.use('/videogame', createVideogame)

 module.exports = router;