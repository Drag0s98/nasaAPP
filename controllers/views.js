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
        // console.log(landings);
        res.status(200).render('landings', { jsStringify, data })
        

    }
}

module.exports = pages;

// var marker = L.marker([#{lat[0]}, #{long[0]}]).addTo(mymap);
// var marker = L.marker([#{nose.reclat}, #{nose.reclong}]).addTo(mymap);
/* 
    each n in filtered
    let marker = L.marker([#{n.reclat}, #{n.reclong}]).addTo(mymap)
40.469321216586145, -3.3801329355490113
    */
