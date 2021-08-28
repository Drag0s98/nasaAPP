const Users = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = {
    login: async (req, res) => {
        res.status(200).render('login')


    },
    auth: async (req, res) => {
        const { nickname, affiliatedNumber } = req.body
        let users = await Users.find({ nickname, affiliatedNumber })
        if (JSON.stringify(users) != '[]') {
            const user = { nickname: nickname }
            const accessToken = generateAccessToken(user)
            res.header('authorization', accessToken).json({
                message: 'Correct user',
                token: accessToken
            })
        }
        function generateAccessToken(user){
            return jwt.sign(user, process.env.SECRET, {expiresIn: '5m'} )
        }



    }
}

module.exports = login