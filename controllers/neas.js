const { parse } = require('dotenv');
const { json } = require('express');
const Neas = require('../models/neas')



const neas = {
    byClassnea: async (req,res) =>{
        let neas;
        let takeClass = req.query.class
        try {
            neas = await Neas.find()
            let selected = neas.map((param) => {
                let getClass = param.orbit_class
                getClass = getClass.toLowerCase()
                let designation = param.designation
                let period_yr = param.period_yr
                if(getClass === takeClass){
                    return "The designation is: " + designation + " and perior year: " + period_yr
                }
            })
            let filtered = selected.filter((param) => { return param != null })
            res.status(200).json(filtered)
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
            
        }
        

       
    },
    byDateNea: async (req,  res) => {
        let neas;
        console.log('hola');
        console.log(req.query);
    }

}


module.exports= neas