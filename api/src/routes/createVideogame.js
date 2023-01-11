require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genero } = require('../db.js')

const router = Router();

/////// creo un video games//////////
///////añade un video games a la db/////////
router.post('/', async (req, res) => {
    const { name, description, image, released, rating, platforms, genres } = req.body;
  
    let platformString = platforms.join(', ')
  
    let gameCreated = await Videogame.create({
      name,
      description,
      image, 
      released,
      rating,
      platforms: platformString,
    })
  
    genres.forEach(async (G) => {
        let genresGame = await Genero.findOne({ where: { name: G } })
        await gameCreated.addGenre(genresGame)
    })
      res.send('Videogame created successfully!')
  });
  

/////// crea el videogame//////////
module.exports = router;

