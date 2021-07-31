const router = require('express').Router()
const pages = require('../controllers/landings')


router.get('/api/astronomy/landings:minimun_mass?', pages.homeLandings)
router.get('/api/astronomy/landings/mass/:mass?', pages.specificMass)
router.get('/astronomy/landings/class/:class?', pages.byClass)

module.exports = router