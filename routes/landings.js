const router = require('express').Router()
const pages = require('../controllers/landings')

router.get('/landings', pages.base)
router.get('/landings:minimum_mass?:from?:to?', pages.getAllLandings)
router.get('/landings/mass/:mass?', pages.specificMass)
router.get('/landings/class/:class?', pages.byClass)

module.exports = router