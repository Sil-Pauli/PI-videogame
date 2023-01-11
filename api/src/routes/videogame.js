require("dotenv").config();
const { Router } = require('express'); 
const axios = require('axios')
const { API_KEY, API_URL} = process.env;
const { Videogame, Genero, } = require('../db')

const router = Router();

/////// Busco un videogame por su ID//////////
router.get('/:id', async function (req, res) {
    const { id } = req.params;
// //     try { 
// //         if (id.includes("-")) {
// //             const gameDB = await Videogame.findOne({ where: {id},
// //                 include: {model: Genero, attributes: ['name'],
// //                 through: {attributes: []}}})

});


module.exports = router;