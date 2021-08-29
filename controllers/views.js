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
            let byClass = req.body.class.toUpperCase()
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
        //  console.log(req.body);
        const regName = /[A-Z]{1}[a-z]+$/
        const regbirthDate = /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/
        const regAffNum = /[0-9]{5}/
        let errMsj = 'Invalid formulary, please try again'
        try {
            if (regName.test(req.body.name) === true && regbirthDate.test(req.body.birthdate) === true && regAffNum.test(req.body.affiliatedNumber) === true) {
                let user = new Users(req.body)
                const new_user = await user.save()
                console.log(new_user);
                let users = await Users.find()
                let data = [new_user, {
                    "users_before": users,
                }]
                console.log("*****User created*****");
                res.status(201).render('loby')
            } else {
                res.status(400).render('register', { errMsj })
            }
        } catch (error) {
            res.status(400).send('Ha ocurrido un error: ' + error)
        }
    },
    search: async (req, res) => {
        try {
            res.status(200).render('search')
        } catch (error) {
            res.status(400).send('Ha ocurrido un error ' + error)
        }
    },
    postSearch: async (req, res) => {
        let affNum = parseInt(req.body.affNum)
        let users
        let emptyMsj = 'Introduce a Affiliated Numbre'
        try {
            users = await Users.find()
            let getUsers = users.map((param) => {
                if (affNum === param.affiliatedNumber) {
                    let params = [param.name, param.nickname, param.occupation, param.birthdate, param.astronomicalPoints, param.neasDiscovered, param.necsDiscovered, param.affiliationDate]
                    return params
                }
            })
            let filtered = getUsers.filter((param) => { return param != null })
            let array = filtered.flat()
            let name = 'Name: ' + array[0]
            let nickname = 'Nickname: ' + array[1]
            let ocupation = 'Ocupation: ' + array[2]
            let birthdate = 'Birthdate: ' + array[3]
            let points = 'Points: ' + array[4]
            let neas = 'Neas: ' + array[5]
            let necs = 'Necs: ' + array[6]
            let affDate = 'Affiliation Date: ' + array[7]
            if(array[7] != undefined){
                res.status(200).render('search', { name, nickname, ocupation, birthdate, points, neas, necs, affDate })
            }else{
                res.status(200).render('search', {emptyMsj})
            }
        } catch (error) {
            res.status(400).send('Ha ocurrido un error ' + error)
        }
    },
    getUsers: async (req, res) => {
        let users
        let sumador = 0
        try {
            users = await Users.find()
            let getId = users.map((param) => {
                return param.affiliatedNumber
            })
            let name = users.map((param) => {
                return param.name
            })
            res.status(200).render('users', { getId, name, sumador })
        } catch (error) {
        }
    },
    edit: async (req, res) => {
        let affNum = parseInt(req.params.num_afiliacion)
        let user = await Users.find({ affiliatedNumber: affNum })
        if (user != '') {
            res.status(200).render('edit', { affNum })
        } else {
            res.status(400).send('Error')
        }
    },
    update: async (req, res) => {
        const id = parseInt(req.body.id)
        let body = req.body
        function eliminarVacios(jsonx) {
            for (var clave in jsonx) {
                if (typeof jsonx[clave] == 'string') {
                    if (jsonx[clave] == 'Vacío' || jsonx[clave] == '') {
                        delete jsonx[clave]
                    }
                } else if (typeof jsonx[clave] == 'object') {
                    eliminarVacios(jsonx[clave])
                }
            }
        }
        eliminarVacios(body)
        try {
            await Users.findOneAndUpdate({ affiliatedNumber: id }, body)
            res.status(201).redirect('/users')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    delete: async (req, res) => {
        let id = req.body.id
        try {
            await Users.findOneAndDelete({ affiliatedNumber: id }, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(
                        '***********Usuario borrado**********'
                    );
                    res.status(200).redirect('/users')
                }
            })
        } catch (err) {
            res.status(400).send({ mesasge: `Error al borrar el usuario ${err}` })
        }
    }
}


module.exports = pages;





