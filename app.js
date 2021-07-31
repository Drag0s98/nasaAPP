const express = require('express')
require('dotenv').config()
require('./utils/db')
const process = require('process')

const routes = require('./routes/landings')


const app = express()
const port = process.env.PORT


app.use(express.json())

app.use('/', routes)
app.use('/api', routes)


app.get('*', (req,res) =>{
    res.status(404).send('Sorry...404 not found')
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
})