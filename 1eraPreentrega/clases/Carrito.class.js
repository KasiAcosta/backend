import Producto from "./Producto.class.js";
import fs from "fs";

const rutaCarrito = "./carritoList.txt";

export default class Carrito {
    constructor() {
        this.producto = new Producto();
        this.carritos = [];
        this.id = 1;
    }

    async crearCarrito() {
        try {
            const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
            this.carritos.push(carr);

            await fs.promises.writeFile(
                rutaCarrito,
                JSON.stringify(this.carritos, null, 2),
                "utf-8"
            )
            return carr
        } catch (e) {
            console.log(e)
        }
    }

    async listarAll() {
        try {
            const contenido = await fs.promises.readFile(rutaCarrito, "utf-8");
            const carritoList = JSON.parse(contenido);

            console.log(carritoList);

            return carritoList;

        } catch (error) {
            console.log(error);
        }
    }

    async listar(id) {
        try {
            const contenido = await this.listarAll();
            let prod = contenido.find((carr) => carr.id === id);
            console.log(prod);
            return prod || { error: "carrito no encontrado" };
        } catch (e) {
            console.log(e);
        }
    }


    async guardarProductoEnCarrito(idProd, idCarrito) {
        try {
            console.log(idProd);
            const contenido = await this.listarAll();
            const producto = await contenido.listar(idProd);
            this.carritos.forEach((carro) => {
                carro.id == idCarrito ? carro.productos.push(producto) : null;
            });
            return this.carritos;
        } catch (e) {
            console.log(e)
        }
    }

    async actualizar(carr, id) {
        try {
            const contenido = await this.listarAll();
            carr.id = Number(id);

            let index = contenido.findIndex((carr) => carr.id == id);
            contenido.splice(index, 1, carr);
        } catch (e) {
            console.log(e);
        }
    }

    async borrar(id) {
        try {
            const contenido = await this.listarAll();
            let index = contenido.findIndex((carr) => carr.id = id);
            return contenido.splice(index, 1);
        } catch (e) {
            console.log(e);
        }
    }
}

