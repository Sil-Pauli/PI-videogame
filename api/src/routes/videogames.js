const { Router } = require('express');
const router = Router();
const {getApivideogame} = require('../controler/games')
//
//    const totalVideogames = await getApivideogame()
//res.status(200).send(totalVideogames )
// }
// );
router.get ('/',getApivideogame)
module.exports = router;