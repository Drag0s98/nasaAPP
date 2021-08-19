const { parse } = require('dotenv');
const { json } = require('express');
const Landings = require('../models/landings')

const landings = {
    base: async (req, res) => {
        let landings = await Landings.find();
        res.status(200).json(landings)
        res.status(400).json({
            "error1": error.message
        })
    },
    getAllLandings: async (req, res) => {
        try {
            let landings;
            let minimum_mass = parseInt(req.query.minimum_mass)
            landings = await Landings.find()
            let selected = landings.map((param) => {
                let mass = parseInt(param.mass)
                let name = param.name
                if (mass >= minimum_mass) {
                    return "The names is " + name + "and mass is: " + mass + "g"
                }
            })
            let filtered = selected.filter((param) => { return param != null })
            if (filtered != '') {
                res.status(200).json({
                    filtered
                });
            }
        } catch (error) {
            res.status(400).json({
                "error2": error.message
            })
        }
        try {
            let landings
            let from = req.query.from
            let to = req.query.to
            landings = await Landings.find()
            let array = await landings.map((param) => {
                let year = param.year
                let name = param.name
                let mass = param.mass
                if (param.year != null) {
                    let justYear = year.slice(0, 4)
                    if (justYear >= from && justYear <= to) {
                        return "The names is: " + name + " the mass is: " + mass + "g and the year is : " + justYear
                    }
                    if (justYear >= from && to === undefined) {
                        return "The names is: " + name + " the mass is: " + mass + "g and the year is : " + justYear
                    }
                    if (from === undefined && justYear <= to) {
                        return "The names is: " + name + " the mass is: " + mass + "g and the year is : " + justYear
                    }
                }
            })
            let filtered = array.filter((param) => { return param != null })
            if (filtered != '') {
                res.status(200).json(filtered)
            }
        } catch (error) {
            res.status(400).json({
                "error3": error.message
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
                    return "The names is " + name + "and mass is: " + mass + "g"
                }
            })
            let filtered = array.filter((param) => { return param != null })

            res.status(200).send(filtered)
        } catch (error) {
            res.status(400).json({
                "error4": error.message
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
                if (classes === takeClass) {
                    return "The names is " + name + "and the class is: " + classes
                }
            })
            let filtered = array.filter((param) => { return param != null })
            res.status(200).send(filtered)
        } catch (error) {
            res.status(400).json({
                "error5": error.message
            })
        }
    }
}



module.exports = landings