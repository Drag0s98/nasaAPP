const router = require('express').Router()
const pages = require('../controllers/neas')

router.get('/neas', pages.routeBase)

module.exports = router