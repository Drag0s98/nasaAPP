const router = require('express').Router()
const pages = require('../controllers/views')


router.get('/', pages.home)
router.get('/landing', pages.landing)
router.post('/landing', pages.sendParams)



module.exports = router