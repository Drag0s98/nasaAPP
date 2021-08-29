const router = require('express').Router()
const pages = require('../controllers/landings')
const token = require('../middleware/index')

router.get('/landings', token, pages.base)
router.get('/landings:minimum_mass?:from?:to?', token, pages.getAllLandings)
router.get('/landings/mass/:mass?', token, pages.specificMass)
router.get('/landings/class/:class?', token, pages.byClass)

module.exports = router