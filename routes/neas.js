const router = require('express').Router()
const pages = require('../controllers/neas')
const { db } = require('../models/landings')

router.get('/api/astronomy/neas?', pages.byClassnea)


module.exports = router