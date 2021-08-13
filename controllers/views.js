const fetch = require('node-fetch')
const Landings = require('../models/landings')
const jsStringify = require('js-stringify')
const Users = require('../models/users')


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

    },
    register: async (req, res) => {
        try {
            let msj = 'Pagina de registro'
            res.status(200).render('register', { msj })
        } catch (error) {
            res.status(400).send(error)
        }

    },
    sendRegister: async (req, res) => {
        console.log(req.body);
        const regName = /[A-Z]{1}[a-z]+$/
        const regbirthDate = /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/
        const regAffNum = /[0-9]{5}/
        let errMsj = 'Invalid formulary, please try again'
        try {
            if (regName.test(req.body.name) === true && regbirthDate.test(req.body.birthdate) === true && regAffNum.test(req.body.affiliatedNumber) === true) {
                console.log("*****User created*****");
                let user = new Users(req.body)
                const new_user = await user.save()
                console.log(new_user);

                let users = await Users.find()
                let data = [new_user, {
                    "users_before": users,
                }]
                res.status(201).json(data)
            } else {
                res.status(200).render('register', { errMsj })
            }
        } catch (error) {
            res.status(400).send('Ha ocurrido un error: ' + error)
        }

    }




}


module.exports = pages;





