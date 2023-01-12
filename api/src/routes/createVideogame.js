// require("dotenv").config();
// const { Router } = require('express'); 
// // const axios = require('axios')
// // const { API_KEY, API_URL} = process.env;
// const { Videogame, Genero, } = require('../db')
// const router = Router();

//  ///// crea el video games,lo guarda en la db//////////

// router.post('/', async (req, res) => {  
//   const { name, image, description, released, rating, platform, genero} = req.body;
//     try {  
//       const newGame = await Videogame.create({
//         name,
//         image,
//         description,
//         released,
//         rating, 
//         platform,
//   });

//   let genreDb = await Genero.findAll({
//     where: {
//       name: genero,
//     },
//   });

//   await newGame.addGenero(genreDb);
//     res.status(200).send('Video game creado con exito');
//     } catch (err) {
//       res.status(404).send("Error del post");     
//     }
// });
// module.exports = router;
  

