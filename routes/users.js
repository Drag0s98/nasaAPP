const router = require('express').Router()
const pages = require('../controllers/users')

router.post('/guild', pages.registerUser)

router.get('/guild/:num', pages.getBase)
router.get('/guild/:num/neas', pages.getNeas)
router.get('/guild/:num/necs', pages.getNecs)
router.get('/guild/:num/points', pages.getPoints)

router.put('/guild/:num', pages.changeUser)
router.put('/guild/:num/delete', pages.putDelete)

router.delete('/guild/:num', pages.deleteUser)

module.exports = router