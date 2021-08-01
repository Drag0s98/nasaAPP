const router = require('express').Router()
const pages = require('../Controllers/neas')

router.get('/api/astronomy/neas?class=?', pages.byClass)


module.exports = router