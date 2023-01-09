require("dotenv").config();
const { Router } = require('express'); 
const axios = require('axios')
const { API_KEY, API_URL} = process.env;
const { Videogame, Genero, } = require('../db')

const router = Router();

// /////////////////// get/videogames /////////////////
// router.get("/", async (req, res) => {
// const { name } = req.query;
// try{
//     if (name){
//         // ///////////////// trae todo del DB   ///////////////
//     const getDbvideogame = await Videogame.findOne({where: {name: name}, include: [Genero]});
//     if (getDbvideogame){
//         const game = getDbvideogame
//         dbGamesFull={
//             id: game.id,
//             name: game.name,
//             image: game.background_image,
//             genres: game.genres.map((genre) => genre.name).join(', '),
//             rating: game.rating,
//             platforms: game.platforms.map((platform) => platform.platform.name),
//             source: "Created",
//         };
//     // ///////////////// trae todo de la Api   ///////////////
//     const response = await axios.get(`${API_URL}/games?key=${API_KEY}&page_size=15`);
//     const games = response.data.results.map((game) => {
//         var game = {
//             id: game.id,
//             name: game.name,
//             image: game.background_image,
//             genres: game.genres.map((genre) => genre.name).join(', '),
//             rating: game.rating,
//             platforms: game.platforms.map((platform) => platform.platform.name),
//             source: 'Api',
//         };
//         return game;
//         });
//         res.json(games.concat(dbGamesFull))
//     } else {
//         let gamesAPI = await axios.get(`${API_URL}/games?search=${name}&key=${API_KEY}&page_size=15`) 
//         gamesAPIFull = gamesAPI.data.results.map((game) => {
//           var game = {
//             id: game.id,
//             name: game.name,
//             image: game.background_image,
//             genres: game.genres.map((genre) => genre.name).join(', '),
//             rating: game.rating,
//             platforms: game.platforms.map((platform) => platform.platform.name),
//             source: 'Api',
//         };
//         return game;
//     })
//     res.json(gamesAPIFull)
//     }
// } else {
//     // ///////////////// concatena la base de datos y la api  ///////////////
//     const gamesResults = []
//     const apiRawg = `${API_URL}/games?key=${API_KEY}`
//     for (let index=0; index<5; index++){
//         let games = (await axios.get(apiRAWG)).data
//         let dataGame = games.results.map((game) => {
//             var game ={
//                 id: game.id,
//                 name: game.name,
//                 image: game.background_image,
//                 genres: game.genres.map((genre) => genre.name).join(', '),
//                 rating: game.rating,
//                 platforms: game.platforms.map((platform) => platform.platform.name),
//                 source: 'Api',
//             };
//             return game
//         })
//         apiRawg = games.next;
//         gamesResults = gamesResults.concat(dataGame)
//     }
//     let dbGames = await Videogame.findAll({ include: [Genero] })
//     let jsonGames = dbGames.map((J) => J.toJSON())
//     jsonGames.forEach(C => {
//       C.source = "Created", 
//       C.genero = C.genero.map((genero) => genero.name).filter(p => p != null).join(', ')
//     });
//     gamesResults = gamesResults.concat(jsonGames)
  
//     res.status(200).send(gamesResults)
//   }
// } catch (err) {
//   res.status(404).send(error, 'No se escontraron Video Games')
// }
// });
router.get('/', async function (req, res) {
  const { name } = req.query;
  
  try {
    if (name) {
      let gamesDB = await Videogame.findOne({where: {name: name}, include: [Genre]});
      if (gamesDB){
          let X = gamesDB
          gamesDBFull = {
              id: X.id,
              name: X.name,
              image: X.image,
              rating: X.rating,
              source: "Created",
              genres: X.genres.map(p => p.name).join(', '),
          }
        let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`) 
        gamesAPIFull = gamesAPI.data.results.map((X) => {
          var game = {
            id: X.id,
            name: X.name,
            rating: X.rating,
            source: 'Api',
            image: X.background_image,
            genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
          };
          return game;
        })
        res.json(gamesAPIFull.concat(gamesDBFull))
      } else {
        let gamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`) 
        gamesAPIFull = gamesAPI.data.results.map((X) => {
          var game = {
            id: X.id,
            name: X.name,
            rating: X.rating,
            source: 'Api',
            image: X.background_image,
            genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
          };
          return game;
        })
        res.json(gamesAPIFull)
      }
    } else {
      let gamesResults = []
      let apiRAWG = `https://api.rawg.io/api/games?key=${API_KEY}`
      for (let index = 0; index < 5; index++) {
        let games = (await axios.get(apiRAWG)).data
        let dataGame = games.results.map((G) => {
          var game = {
            name: G.name,
            image: G.background_image,
            genres: G.genres.map((gen) => gen.name).filter(p => p != null).join(', '),
            source: "Api",
            id: G.id,
            rating: G.rating
          };
          return game
        })
        apiRAWG = games.next;
        gamesResults = gamesResults.concat(dataGame)
      }
      
      let dbGames = await Videogame.findAll({ include: [Genre] })
      let jsonGames = dbGames.map((J) => J.toJSON())
      jsonGames.forEach(C => {
        C.source = "Created", 
        C.genres = C.genres.map((genre) => genre.name).filter(p => p != null).join(', ')
      });
      gamesResults = gamesResults.concat(jsonGames)
    
      res.json(gamesResults)
    }
  } catch (err) {
    res.status(404).json({ err })
  }
});
module.exports = router;