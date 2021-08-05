const { parse } = require('dotenv');
const { json } = require('express');
const Neas = require('../models/neas')



const neas = {
    routeBase: async (req, res) => {
        try {
            if (req.query.from || req.query.to) {

                let from = req.query.from
                let to = req.query.to
                let neasFilter;
                if (from && to) {
                    from = from + '-01-01'
                    to = to + '12-31'
                    neasFilter = await Neas.find({ "discovery_date": { "$gte": from, "$lte": to } })
                } else if (from === undefined && to) {
                    to = to + '-12-31'
                    neasFilter = await Neas.find({ 'discovery_date': { "$lte": to } })
                } else if (to === undefined && from) {
                    from = from + '-01-01'
                    neasFilter = await Neas.find({ 'discovery_date': { "$gte": from } })
                }
                res.status(200).json(neasFilter.map(param => {
                    return {
                        designation: param.designation,
                        discovery_date: param.discovery_date,
                        period_yr: param.period_yr
                    }
                }))
            }
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    byClass: async (req, res) => {
        let neas;
        let takeClass = req.query.class
        console.log(takeClass);
        try {
            neas = await Neas.find()
            let selected = neas.map((param) => {
                let getClass = param.orbit_class
                getClass = getClass.toLowerCase()
                let designation = param.designation
                let period_yr = param.period_yr
                if (getClass === takeClass) {
                    console.log("************************");
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
    }

}
module.exports = neas