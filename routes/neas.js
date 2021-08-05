const router = require('express').Router()
const pages = require('../controllers/neas')

router.get('/neas', pages.routeBase)
router.get('/neas?class:', pages.byClass) //No funciona


module.exports = router