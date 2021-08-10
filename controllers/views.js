const fetch = require('node-fetch')
const Landings = require('../models/landings')
const jsStringify = require('js-stringify')

const pages = {
    home: (req, res) => {
        fetch('https://api.nasa.gov/planetary/apod?api_key=jSRbRCxea7XZD7bfyqYTbocXO1rCAvbSyp06Nlzc')
            .then(res => res.json())
            .then(payload => {
                let img = payload.url
                let msj = 'NasaAPP'
                res.status(200).render('home', { msj, img })
            })
    },
    landing: async (req, res) => {
        let data = await Landings.find()
        res.status(200).render('landings', { jsStringify, data })


    },
    sendParams: async (req, res) => {
        try {
            let data = await Landings.find()
            let byMass = req.body.mass
            let byClass = req.body.class
            if (byMass.length > 0 || byClass.length > 0) {
                let getClass = await Landings.find({ recclass: byClass })
                let getMass = await Landings.find({ mass: byMass })
                res.status(200).render('landings', { jsStringify, getClass, getMass })
            } else {
                res.status(200).render('landings', { jsStringify, data })
            }
        } catch (error) {
            res.status(400).send(`Un error inesperado ha ocurrido ${error}`)
        }

    }



}


module.exports = pages;





