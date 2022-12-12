require("dotenv").config()

const config = { 
    mongoDb:{
        url: process.env.URL_BD,
        options:{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
 }

 module.exports = config;