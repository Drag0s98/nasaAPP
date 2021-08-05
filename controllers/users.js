const Users = require('../models/users')

const users = {
    registerUser: async (req, res) => {
        let user = new Users(req.body)
        console.log('holaaaa');
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
    }
}


module.exports = users;