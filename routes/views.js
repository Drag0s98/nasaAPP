const router = require('express').Router()
const pages = require('../controllers/views')


router.get('/', pages.home)
router.get('/landing', pages.landing)
router.get('/register', pages.register)
// router.get('/search', pages.search)
// router.get('/edit/:num_afiliacion?')

router.post('/landing', pages.sendParams)


module.exports = router