const router = require('express').Router()
const pages = require('../controllers/landings')


router.get('/api/astronomy/landings:minimum_mass?', pages.homeLandings)
router.get('/api/astronomy/landings/mass/:mass?', pages.specificMass)
router.get('/astronomy/landings/class/:class?', pages.byClass)
router.get(`/astronomy/landings?from=1960`, pages.byDate)

module.exports = router