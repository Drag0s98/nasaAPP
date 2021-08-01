const express = require('express')
require('dotenv').config()
require('./utils/db')
const process = require('process')

const landingRoutes = require('./routes/landings')
const neasRoutes = require('./routes/neas')



const app = express()
const port = process.env.PORT


app.use(express.json())

app.use('/', landingRoutes, neasRoutes)
app.use('/api/astronomy/landings', landingRoutes)
app.use('/api/astronomy/neas', neasRoutes)




app.get('*', (req,res) =>{
    res.status(404).send('Sorry...404 not found')
})

app.listen(port, () =>{
    console.log(`Landings example app listening at http://localhost:${port}/api/astronomy/landings`);
    console.log(`Nean's example app listening at http://localhost:${port}/api/astronomy/neas`);
})