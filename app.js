const express = require('express')
require('dotenv').config()
require('./utils/db')
const process = require('process')
const path = require('path')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')

const landingRoutes = require('./routes/landings')
const neasRoutes = require('./routes/neas')
const usersRoutes = require('./routes/users')
const viewRoutes = require('./routes/views')
const loginRouter = require('./routes/login')

const app = express()
const port = process.env.PORT

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './views'))

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.use('/', landingRoutes, neasRoutes, usersRoutes, viewRoutes, loginRouter)
app.use('/api/astronomy', landingRoutes, neasRoutes, usersRoutes)

app.get('*', (req,res) =>{
    res.status(404).send('Sorry...404 not found')
})

app.listen(port, () =>{
    console.log(`Landings example app listening at ${port}/api/astronomy/landings`);
    console.log(`Nean's example app listening at ${port}/api/astronomy/neas`);
})