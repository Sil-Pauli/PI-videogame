require("dotenv").config();
const { Router } = require('express'); 
const axios = require('axios')
const { API_KEY, API_URL} = process.env;
const { Videogame, Genero, } = require('../db')

const router = Router();

/////// trae por Db,Api,nombre//////////
router.get('/', async function (req, res) {
    const { name } = req.query;
    
    try {
      if (name) {
        let gamesDB = await Videogame.findOne({where: {name: name}, include: [Genero]});
        if (gamesDB){
            let game = gamesDB
            gamesDBFull = {
                id: game.id,
                name: game.name,
                image: game.background_image,
                genres: game.genres.map(genre => genre.name),
                rating: game.rating,
                platforms: game.platforms.map(platform => platform.platform.name),
            }
          let gamesAPI = await axios.get(`${API_URL}/games?search=${name}&key=${API_KEY}&page_size=15`) 
          gamesAPIFull = gamesAPI.data.results.map((g) => {
            var game = {
                id: g.id,
                name: g.name,
                image: g.background_image,
                genres: g.genres.map(genre => genre.name),
                rating: g.rating,
                platforms: g.platforms.map(platform => platform.platform.name),
            };
            return game;
          })
          res.json(gamesAPIFull.concat(gamesDBFull))
        } else {
          let gamesAPI = await axios.get(`${API_URL}/games?search=${name}&key=${API_KEY}&page_size=15`) 
          gamesAPIFull = gamesAPI.data.results.map((p) => {
            var game = {
                id: p.id,
                name: p.name,
                image: p.background_image,
                genres: p.genres.map(genre => genre.name),
                rating: p.rating,
                platforms: p.platforms.map(platform => platform.platform.name),
            };
            return game;
          })
          res.json(gamesAPIFull)
        }
      } else {
        let gamesResults = []
        let apiRAWG = `${API_URL}/games?key=${API_KEY}`
        for (let index = 0; index < 5; index++) {
          let games = (await axios.get(apiRAWG)).data
          let dataGame = games.results.map((j) => {
            var game = {
                id: j.id,
                name: j.name,
                image: j.background_image,
                genres: j.genres.map(genre => genre.name),
                rating: j.rating,
                platforms: j.platforms.map(platform => platform.platform.name),
            };
            return game
          })
          apiRAWG = games.next;
          gamesResults = gamesResults.concat(dataGame)
        }
        
        let dbGames = await Videogame.findAll({ include: [Genero] })
        let jsonGames = dbGames.map((J) => J.toJSON())
        jsonGames.forEach(C => {  
        C.genres = C.genres.map((genre) => genre.name).filter(g=> g.name.toLoweCase().includes(name.toLowerCase()));
        });
        gamesResults = gamesResults.concat(jsonGames)
      
        res.status(200).send(gamesResults)
      }
    } catch (err) {
      res.status(404).send('NO se encontro el video game');
    }
  });


  ///// crea el video games,lo guarda en la db//////////
  router.post('/', async (req, res) => {  
    const { name, image, description, released, rating, platform, genero} = req.body;
      try {  
        const newGame = await Videogame.create({
          name,
          image,
          description,
          released,
          rating, 
          platform,
    });
  
    let genreDb = await Genero.findAll({
      where: {
        name: genero,
      },
    });
  
    await newGame.addGenero(genreDb);
      res.status(200).send('Video game creado con exito');
      } catch (err) {
        res.status(404).send("Error del post");     
      }
  });
module.exports = router;