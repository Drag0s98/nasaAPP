const router = require('express').Router()
const pages = require('../controllers/views.js')

router.get('/', pages.home)
router.get('/landing', pages.landing)
router.get('/register', pages.register)
router.get('/search', pages.search)
router.get('/users', pages.getUsers)
router.get('/edit/:num_afiliacion?', pages.edit)
router.get('/delete', pages.delete)

router.post('/landing', pages.sendParams)
router.post('/register', pages.sendRegister)
router.post('/search', pages.postSearch)
router.post('/edit/update', pages.update)
router.post('/delete', pages.delete)

module.exports = router