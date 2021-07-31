const router = require('express').Router()
const pages = require('../controllers/landings')


router.get('/api/astronomy/landings:mass?', pages.homeLandings)

module.exports = router