const router = require('express').Router()
const pages = require('../controllers/neas')
const token = require('../middleware/index')


router.get('/neas', token, pages.routeBase)

module.exports = router