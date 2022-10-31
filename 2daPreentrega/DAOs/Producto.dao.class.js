import mongoose from "mongoose";
import ProductoModel from "../models/ProductoModel.js";

export default class Producto{
    
    constructor(){
        this.url = "mongodb+srv://kasiacosta:2!3iyCbUaK3Y9r9@cluster0.sj9ho85.mongodb.net/?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect
    }

    async createData(prod) {
        try {
            await this.mongodb(this.url)
            const newProduct = new ProductoModel(prod)
            return await newProduct.save()
        } catch (err){
            console.log(err);
        }
    }
  
    async listar(id){
        try{
            await this.mongodb(this.url)
            return await ProductoModel.findById(id)
        } catch (error){
            return { error: "Producto no existe" };
        }
    }

    async listarAll(){
        try {
            await this.mongodb(this.url)
            return await ProductoModel.find()
        }catch (err){
            return {error: "No existen productos"}
        }
    }

    async borrar(id, prod){
        try{
            await this.mongodb(this.url);
            return await ProductoModel.findByIdAndDelete(id);
        } catch (err){
            return{ error: "No existe producto con ese id"};
        }
    }

    async put(id, prod){
        try{
            await this.mongodb(this.url);
            return await ProductoModel.findByIdAndUpdate(id, prod);
        } catch (err){
            console.log(err);
        }
    }

}

