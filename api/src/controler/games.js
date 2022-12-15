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
// const getApivideogame = async (req, res) => {
//     res.status(200).send('Details Funciona')
// };
module.exports = { getApivideogame }