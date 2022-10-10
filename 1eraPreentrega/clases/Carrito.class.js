import Producto from "./Producto.class.js";
import fs from "fs";

export default class Carrito{
    constructor(){
        this.producto = new Producto();
        this.carritos = [];
        this.id = 1;
    }

    async crearCarrito(){
        try{
        const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
        this.carritos.push(carr);
        
        await fs.promises.writeFile(
            "./carritoList.txt",
            JSON.stringify(this.carritos, null, 2),
            "utf-8"
        )
        return carr
    } catch (e){
        console.log(e)
    }
    }

    listarAll(){
        return this.carritos.length
        ? this.carritos
        : { error: "no hay carritos cargados"};
    }

    listar(id){
        let prod = this.carritos.find((carr) => carr.id == id);
        return prod || { error: "carrito no encontrado" };
    }


    guardarProductoEnCarrito(idProd, idCarrito) {
        console.log(idProd);
        const producto = this.producto.listar(idProd);
        this.carritos.forEach((carro) => {
            carro.id == idCarrito ? carro.productos.push(producto) : null;
        });
        return this.carritos;
    }

    actualizar(carr, id){
        carr.id = Number(id);
        let index = this.carritos.findIndex((carr) => carr.id == id);
        this.productos.splice(index, 1, carr);
    }

    borrar(id){
        let index = this.carritos.findIndex((carr) => carr.id = id);
        return this.carritos.splice(index, 1);
    }
}

