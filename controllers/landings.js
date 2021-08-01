const { parse } = require('dotenv');
const { json } = require('express');
const Landings = require('../models/landings')

const landings = {
    homeLandings: async (req, res) => {
        let landings;
        //console.log(req.query.minimum_mass);
        let minimum_mass = parseInt(req.query.minimum_mass)
       // console.log(minimum_mass);
        try {
            landings = await Landings.find()
            let selected = landings.map((param) => {
                let mass = parseInt(param.mass)
                let name = param.name
                //  console.log(mass);
                if (mass >= minimum_mass) {
                    return "The names is " + name + "and mass is: " + mass
                }
            })
            let filtered = selected.filter((param) => { return param != null })
            res.status(200).send(
                filtered
            );
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    specificMass: async (req, res) => {
        let landings;
        let takeMass = parseInt(req.params.mass)
        try {
            landings = await Landings.find()
            let array = await landings.map((param) => {
                let mass = parseInt(param.mass)
                let name = param.name

                if (mass === takeMass) {
                    return "The names is " + name + "and mass is: " + mass
                }
            })
            let filtered = array.filter((param) => { return param != null })

            res.status(200).send(filtered)
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    byClass: async (req, res) => {
        let landings
        let takeClass = req.params.class
        try {
            landings = await Landings.find()
            let array = await landings.map((param) => {
                let classes = param.recclass
                let name = param.name
                //console.log(takeClass);
                if(classes === takeClass){
                    return "The names is " + name + "and the class is: " + classes
                }
            })
            let filtered = array.filter((param) => { return param != null })
            res.status(200).send(filtered)
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    byDate: async (req, res) => {
        console.log(req.params);
        console.log('hola');
        try {

            res.status(200).json('hola')
            
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
            
        }
    }

}



module.exports = landings