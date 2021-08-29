const Users = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = {
    login: async (req, res) => {
        res.status(200).render('login')
    },
    auth: async (req, res) => {
        try {
            const { nickname, affiliatedNumber } = req.body
            let users = await Users.find({ nickname, affiliatedNumber })
            if (JSON.stringify(users) != '[]') {
                const user = { nickname: nickname }
                const accessToken = generateAccessToken(user)
                req.flash('name', nickname)
                res.cookie('token', accessToken).redirect('/')
            }
            function generateAccessToken(user) {
                return jwt.sign(user, process.env.SECRET, { expiresIn: '5m' })
            }
        } catch (error) {
            let errMsj = 'Invalid Log In, try again'
            res.status(400).render('login', { errMsj })
        }
    }
}

module.exports = login