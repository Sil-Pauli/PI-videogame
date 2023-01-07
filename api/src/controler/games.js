const axios = require('axios')
const { Videogame, Genero} = require('../db')
require("dotenv").config();
const { API_KEY, API_URL} = process.env;
///////////////// trae todo de la API   ///////////////
const getApivideogame =  async (req, res) => {
    try{
        const response = await axios.get(`${API_URL}/games?key=${API_KEY}&page_size=100`);
        const games = response.data.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                image: game.background_image,
                genres: game.genres.map((genre) => genre.name),
                rating: game.rating,
                platforms: game.platforms.map((platform) => platform.platform.name),
            };
        }
        );
        res.status(200).send(games);
    } catch (error) {
        res.status(400).send(error, 'No se encontraron juegos');
    }
};

///////////////// trae todo del DB   ///////////////
const getDbvideogame = async () =>{
 return await Videogame.findAll({
    include: {
        model: Genero,
        attributes: ['name'],
        through: {attributes: [] }
    }
 })
}

///////////////// concatena la base de datos y la api  ///////////////
const getAllGames = async () => {
    const apiData = await getApivideogame(); // devuelvo todo la pi
    const dbInfo = await getDbvideogame();
    const total = apiData.concat(dbInfo);
    return total;
  };

  
  router.get("/", async (req, res) => {
    const { name } = req.query;
    let totalGames = await getAllGames();
    if (name) {
      let searchGame = totalGames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
 );
        searchGame.length ?
        res.status(200).send(searchGame):
        res.status(404).json('No se encontraron juegos' );
    } else {
        res.status(200).json(totalGames);
  
    }
});
// const getApivideogame = async (req, res) => {
//     res.status(200).send('Details Funciona')
// };
module.exports = { getApivideogame, getDbvideogame, getAllGames }