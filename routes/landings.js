const router = require('express').Router()
const pages = require('../controllers/landings')


router.get('/api/astronomy/landings:minimun_mass?', pages.homeLandings)

module.exports = router