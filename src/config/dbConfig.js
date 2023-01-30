const admin = require ('firebase-admin')
const { type } = require('os');

const serviceAccount = require('./firebaseConfig.js');

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
   
} catch (error) {
    console.log(error);
}

const config = {
    mongoDb: {
        url: process.env.DB,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firebase: {
        db: admin.firestore(),
    }
}

module.exports= config;

// //CONEXION A LA DB EN MONGO

/* const config = {
    mongoDb: {
        url: process.env.DB,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}

module.exports=config; */
