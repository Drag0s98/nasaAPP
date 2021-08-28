const router = require('express').Router()
const pages = require('../controllers/login')


router.get('/login', pages.login)

router.post('/auth', pages.auth)

module.exports = router
