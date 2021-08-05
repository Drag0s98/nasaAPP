const router = require('express').Router()
const pages = require('../controllers/users')


// router.get
router.post('/:guild?', pages.registerUser)

module.exports = router