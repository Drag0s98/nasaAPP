//Codigo de conexion a la base de datos

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { //Se conecta a la url del .env
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
const db = mongoose.connection;
db.on("error", error => console.log(error)); //Si hay error se lanza el error
db.once("open", () => console.log("connection to db established")); //Confirmamos que se conecta
module.exports = mongoose;