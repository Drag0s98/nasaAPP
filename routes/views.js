const router = require('express').Router()
const pages = require('../controllers/views.js')


router.get('/', pages.home)
router.get('/landing', pages.landing)
router.get('/register', pages.register)
router.get('/search', pages.search)

// router.get('/edit/:num_afiliacion?')

router.post('/landing', pages.sendParams)
router.post('/register', pages.sendRegister)
router.post('/search', pages.postSearch)


module.exports = router