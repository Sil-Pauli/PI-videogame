require("dotenv").config();
const { Router } = require('express'); 
const axios = require('axios')
const { API_KEY, API_URL} = process.env;
const {  Genero, } = require('../db')

const router = Router();

/////// Busco los generos y los guardo en la DB//////////

router.get('/', async (req, res) => {
    try {   
        const genresAPI = await axios.get(`${API_URL}/genres?key=${API_KEY}`)
        genresAPI.data.results.forEach(p => {
            Genero.findOrCreate({ // findOrCreate: se fija si esta, si no esta lo crea y si esta lo deja
                where: { name: p.name }
            }) 
       })
       let dbGenres = await Genero.findAll()
       res.status(200).send(dbGenres);
    } catch (error) {
        res.send(`Error en la ruta /genres ${error}`);
    } 
})
module.exports = router;