import mongoose from "mongoose";
import CarritoModel from "../models/CarritoModel.js";
import ProductoModel from "../models/ProductoModel.js";
import Producto from "../DAOs/Producto.dao.class.js"


export default class Carrito{
    constructor(){
        this.url = "mongodb+srv://kasiacosta:2!3iyCbUaK3Y9r9@cluster0.sj9ho85.mongodb.net/?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect
    }

    async listarAll(){
        try {
            await this.mongodb(this.url)
            return await CarritoModel.find()
        }catch (err){
            return {error: "No existen productos"}
        }
    }

    async crearCarrito(){
       try {
        const carritos = await this.listarAll();
        if(carritos.length === 0){
            const carrito = { id: 1, timestamp: Date.now(), productos: [] };
            const newElement = new CarritoModel(carrito);
            const result = await newElement.save();
            return result;
        } else{
            const carrito = { id: carritos.length + 1, timestamp: Date.now(), productos: [] };
            const newElement = new CarritoModel(carrito);
            const result = await newElement.save();
            return result;
        }
       } catch(err){
        console.log(err);
       }
    }

    async guardarProductoEnCarrito(id, newElement){
        try{
            const cart = await this.listarAll();
            const cartIndex = cart.findIndex((e) => e.id === Number(id));
            const prodInCart = cart[cartIndex].productos;
           if(cart[cartIndex]. productos.length === 0){
            newElement.id = 1;
           }else{
            newElement.id= cart[cartIndex].productos.length + 1;
           }
           newElement.timestamp = Date.now();
           prodInCart.push(newElement);
           await CarritoModel.updateOne(
            { id: id},
            {
                $set: { productos: prodInCart },
            }
           )

        } catch(err){
            console.log(err);
        }
    } 

    async listar(id){
        try {
            const cart = await CarritoModel.findOne({ id:id });
            const products = cart?.productos;
            if(products){
                return products;
            } else{
                console.log(error)
            }
        } catch(err){
            console.log(err);
        }
    }


    async borrar(id, prodId){
        try {
            const carts = await this.listarAll()
            const cartIndex = carts.findIndex((e) => e.id == id)

            if (cartIndex >= 0){
                const productsOnCart = carts[cartIndex].productos
                const prodToDeleteIndex = productsOnCart.findIndex((e) => e.id == prodId)
                if(prodToDeleteIndex >=0){
                    productsOnCart.splice(prodToDeleteIndex, 1)
                    await CarritoModel.updateOne(
                        { id: id},
                        {
                            $set:{ productsOnCart},
                        }
                    )
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        } catch(err){
            console.log(err)
        }
    }
}

