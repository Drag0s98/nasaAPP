const router = require('express').Router()
const pages = require('../controllers/neas')

router.get('/neas:?', pages.byClassnea)
router.get('/neas=', pages.byDateNea)

module.exports = router