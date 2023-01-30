const config =require("../../config/dbConfig.js")
const mongoose =require("mongoose");
const {normalizeMsj}=require("../normalizr.js")

const nodemailer= require('nodemailer');
const { db } = require("../../schema/schemaCarts.js");
const {
  loggerDev,
  loggerProd
} = require("../../loggers/logger_config.js");
const NODE_ENV = process.env.NODE_ENV || "development";
const logger = NODE_ENV === "production"
? loggerProd
: loggerDev


try {
    mongoose.connect(config.mongoDb.url, config.mongoDb.options)
} catch (error) {
    console.log(error);
};

const mongooseSchema = new mongoose.Schema({
    author: {
        id: { type: String, required: true, max: 100 },
        nombre: { type: String, required: true, max: 100 },
        apellido: { type: String, required: true, max: 50 },
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true, max: 100 },
        timestamp: { type: Date, default: Date.now }
    },
    text: { type: String, required: true, max: 400 }
});

const msjModel = mongoose.model('mensajes', mongooseSchema);



const saveMsjs = async (msj) => {
    const newMsj = new msjModel(msj);
    try {
        newMsj.save()
    } catch (error) {
        throw new Error(error);
    }
}

const getMsjs = async () => {
    try {
        const mensajes = await msjModel.find();
        return normalizeMsj(mensajes);
    }  catch(err) {
      logger.log("error",err)
    }
}



  async function sendMail(name,mail,listCart) {
    try {
        await transporter.sendMail({
          to:"retete2854@sopulit.com",
          from:"iva12@ethereal.email",
          subject:`nuevo pedido de Nombre: ${name} Mail: ${mail}`,
          html:`${listCart}`
      });
      }  catch(err) {
        logger.log("error",err)
      }
    }

    async function deleteCartBuy(idCart){
      try{
       await db.collection("carts").deleteOne({id:idCart});
      }
      catch(err) {
        logger.log("error",err)
      }
    }
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host: 'smtp.gmail.email',
        port: 587,
        auth: {
            user: 'sebykasiacosta@gmail.com',
            pass: "pripxpboynmzhqev"
        }
      });

      module.exports={saveMsjs,getMsjs,sendMail,deleteCartBuy}