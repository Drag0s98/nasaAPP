const router = require('express').Router()
const pages = require('../controllers/users')
const token = require('../middleware/index')

router.post('/guild',token, pages.registerUser)

router.get('/guild/:num',token, pages.getBase)
router.get('/guild/:num/neas',token, pages.getNeas)
router.get('/guild/:num/necs',token, pages.getNecs)
router.get('/guild/:num/points', pages.getPoints)

router.put('/guild/:num',token, pages.changeUser)
router.put('/guild/:num/delete',token, pages.putDelete)

router.delete('/guild/:num',token, pages.deleteUser)

module.exports = router