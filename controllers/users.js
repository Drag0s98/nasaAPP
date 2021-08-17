const { parse } = require('dotenv');
const Users = require('../models/users')

const users = {
    registerUser: async (req, res) => {
        let user = new Users(req.body)
        console.log("*****User created*****");
        try {
            const new_user = await user.save()
            console.log(new_user);

            let users = await Users.find()
            let data = [new_user, {
                "users_before": users
            }]
            res.status(201).json(data)
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    getBase: async (req, res) => {
        takeNum = parseInt(req.params.num)
        var f = new Date();
        year = f.getFullYear()
        try {
            let users = await Users.find()
            let user = users.map((param) => {
                let affiliatedNum = param.affiliatedNumber
                let birthdate = param.birthdate
                let name = param.name
                let affiliatedDate = param.affiliationDate
                let ocupation = param.occupation
                let points = param.arstronomicalPoints
                let date = parseInt(birthdate.toString().slice(11, 15))
                let yearsOld = year - date
                if (takeNum === affiliatedNum) {
                    return "The name is: " + name + " she/he has " + yearsOld + " years old " + " his ocupation is " + ocupation + ". " + "The affiliated number is : " + affiliatedNum + " ,have " + points + " points " + "and his affiliation date is: " + affiliatedDate
                }
            })
            let filtered = user.filter((param) => { return param != null })
            if (filtered != '') {
                res.status(200).json(filtered)
            } else {
                res.status(200).json("The user doesn't exist, please introduce a correct affiliation number.")
            }
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    getNeas: async (req, res) => {
        takeNum = parseInt(req.params.num)
        try {
            let users = await Users.find()
            let user = users.map((param) => {
                let affiliatedNum = param.affiliatedNumber
                let userNeas = param.neasDiscovered
                if (takeNum === affiliatedNum) {
                    return "The neas discovered of " + affiliatedNum + " its " + userNeas
                }
            })
            let filtered = user.filter((param) => { return param != null })
            if (filtered != '') {
                res.status(200).json(filtered)
            } else {
                res.status(200).json("The user doesn't exist, please introduce a correct affiliation number.")
            }
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    getNecs: async (req, res) => {
        takeNum = parseInt(req.params.num)
        try {
            let users = await Users.find()
            let user = users.map((param) => {
                let affiliatedNum = param.affiliatedNumber
                let userNeas = param.necsDiscovered
                if (takeNum === affiliatedNum) {
                    return "The necs discovered of " + affiliatedNum + " its " + userNeas
                }
            })
            let filtered = user.filter((param) => { return param != null })
            if (filtered != '') {
                res.status(200).json(filtered)
            } else {
                res.status(200).json("The user doesn't exist, please introduce a correct affiliation number.")
            }
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    getPoints: async (req, res) => {
        takeNum = parseInt(req.params.num)
        try {
            let users = await Users.find()
            let user = users.map((param) => {
                let affiliatedNum = param.affiliatedNumber
                let userPoints = param.astronomicalPoints
                if (takeNum === affiliatedNum) {
                    return "The total points of " + affiliatedNum + " its " + userPoints
                }
            })
            let filtered = user.filter((param) => { return param != null })
            if (filtered != '') {
                res.status(200).json(filtered)
            } else {
                res.status(200).json("The user doesn't exist, please introduce a correct affiliation number.")
            }
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    changeUser: async (req, res) => {
        let takeNum = parseInt(req.params.num)
        let update = req.body
        try {
            const result = await Users.findOneAndUpdate({ affiliatedNumber: takeNum }, update)
            res.status(201).send(result)
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    putDelete: async (req, res) => {
        let takeNum = parseInt(req.params.num)
        try {
            const result = await Users.findOneAndUpdate({ affiliatedNumber: takeNum }, { deleted: true })
            res.status(201).send(result)
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    },
    deleteUser: async (req, res) => {
        let takeNum = parseInt(req.params.num)
        let users = await Users.find()
        try {
            users.map((param) => {
                if (param.deleted == true) {
                    Users.findOneAndRemove({ affiliatedNumber: takeNum }, (err, user) => {
                        if (err) res.status(500).send({ message: `Error al borrar el usuario ${err}` })
                        try {
                            user.remove(err => {
                                res.status(200).send({ message: 'El usuario ha sido borrado' })
                            })
                        } catch (err) {
                            res.status(500).send({ message: `Error al borrar el usuario ${err}` })

                        }
                    })
                }
            })
        } catch (error) {
            res.status(400).json({
                "error": error.message
            })
        }
    }
}
module.exports = users;