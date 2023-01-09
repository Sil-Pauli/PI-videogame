const { Router } = require('express')

const videogames = require('./videogames');
//const videogame = require('./videogames');
//  const genres = require('./genres')
//  const creaVgame = require('./creaVgame')
 
 const router = Router();
 
   // Busco los 100 primeros videogames o ?name="nemo" busco los de ese nombre
router.use('/videogames', videogames);
   // Busco un videogame por su ID
//router.use('/videogame', videogame);

//    // Busco todos los genres
//  router.use('/genres', genres); 
//    // Creo un video juego POST
//  router.use('/videogame', creaVgame)
 
 
 module.exports = router;