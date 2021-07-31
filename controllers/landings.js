const { parse } = require('dotenv');
const { json } = require('express');
const Landings = require('../models/landings')


const landings = {
    homeLandings: async (req, res) => {
        let landings;
        //console.log(req.query.minimun_mass);
        let minimun_mass = parseInt(req.query.minimun_mass)
        console.log(minimun_mass);
        try {
            landings = await Landings.find()
            let selected = landings.map((param) =>{
                let mass = parseInt(param.mass)
                let name = param.name
              //  console.log(mass);
                if(mass >= minimun_mass){
                    return "The names is " + name +"and mass is: " +  mass
                }
            })
            let filtered = selected.filter((param)=>{return param != null})
            

            
            
            
            res.status(200).send(
                filtered
            );
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    }

}



module.exports = landings