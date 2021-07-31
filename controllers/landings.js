const Landings = require('../models/landings')


const landings = {
    homeLandings: async (req, res) => {
        let landings;

        try{
            req.params.mass ? 
                landings = await Landings.find({
                    name: String(req.params.mass)
                }) : 
                landings = await Landings.find()
                console.log(landings);

                res.status(200).json({
                    landings
                });
        }catch(error){
            res.status(400).json({
                "error": error.message
            })
        }
    }

}



module.exports = landings