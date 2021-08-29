require('dotenv').config()
const jwt = require('jsonwebtoken')

function validateToken (req,res,next){
    if(Object.keys(req.cookies).length === 0) res.send('Access denied');

    jwt.verify(req.cookies.token, process.env.SECRET, (err, user) => {
        if(err){
            res.send('Access denied, token expired or incorrect');
        }else{
            next();
        }
    })


}

module.exports = validateToken