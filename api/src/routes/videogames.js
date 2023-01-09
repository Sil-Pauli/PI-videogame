require("dotenv").config();
const { Router } = require('express'); 
const axios = require('axios')
const { API_KEY, API_URL} = process.env;
const { Videogame, Genero, } = require('../db')

const router = Router();


// ///////////////// trae todo de la Api   ///////////////
const getApiInfo =async () =>{
    const apiUrl = await axios.get(`${API_URL}/games?key=${API_KEY}`);
    const apiInfo = await apiUrl.data.results.map(game=>{
        return{
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres: game.genres.map(genre => genre.name),
            rating: game.rating,
            platforms: game.platforms.map(platform => platform.platform.name),
        };
    });
    return apiInfo;
}; 
// ///////////////// trae todo del DB   ///////////////
const getDbinfo = async ()=>{
    return await Videogame.findAll({
        include: {
            module: Genero,
            attributes: ['name'],
            througt:{
                attributes:[],
            }
        } 
    });
};

// ///////////////// concatena la base de datos y la api  ///////////////
const getAllVideoGames = async ()=>{
    const apiInfo = await getApiInfo ();
    const dbInfo = await getDbinfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};
///////////////// get/videogames /////////////////
router.get("/videogames", async (req, res) => {
const name = req.query.name;
let videoGameTotal = await getAllVideoGames(); 
    if (name){
        let videoGameName = await videoGameTotal.filter(g=> g.name.toLoweCase().includes(name.toLowerCase()));
        videoGameName.length?
        res.status(200).send(videoGameName):
        res.status(404).send('NO se encontro el video game');
    } else{
        res.status(200).send(videoGameTotal)
    }
});

// const getApivideogame = async (req, res) => {
//     res.status(200).send('Details Funciona')}

module.exports = router;