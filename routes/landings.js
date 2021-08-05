const router = require('express').Router()
const pages = require('../controllers/landings')


router.get('landings', pages.homeLandings)
router.get('/landings/mass/:mass?', pages.specificMass)
router.get('/landings/class/:class?', pages.byClass)
router.get('/landings:from?', pages.byDate)


/* 
router.get('/astronomy/landings:minimum_mass?:from?:to?', landings.getAllLandings);
router.get('/astronomy/landings/mass/:mass', landings.getOneLandingMass);
router.get('/astronomy/landings/class/:class', landings.getAllLandingClass)

*/
module.exports = router