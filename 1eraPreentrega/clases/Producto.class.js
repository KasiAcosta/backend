import fs from "fs";

export default class Producto {
    static productos = [];
    constructor() {
        this.id = 0;
    }

    async guardar(prod) {
        try {
            prod.id = ++this.id;
            prod.timeStamp = Date.now();
            Producto.productos.push(prod);
            await fs.promises.writeFile(
                "./productosList.txt",
                JSON.stringify(Producto.productos, null, 2),
                "utf-8"
            )
            return prod;
        } catch (e) {
            console.log(e);
        }
    }

    async listar(id) {
        try {
            const todos = this.listarAll();
            let producto = todos.filter((prod) => prod.id === id);
            
            console.log(producto);
            return producto || { error: "producto no encontrado" };
        } catch (e) {
            console.log(e);
        }
    }

    async listarAll() {
        try {
            const contenido = await fs.promises.readFile("./productosList.txt", "utf-8");
            const prodList = JSON.parse(contenido);

            console.log(prodList);

            return prodList;

        } catch (error) {
            console.log(error);
        }
    }



    async actualizar(prod, id) {
        try {
            const contenido = await this.listarAll();
            prod.id = Number(id);
            let index = contenido.findIndex((prod) => prod.id == id);
            contenido.splice(index, 1, prod);
        } catch (e) {
            console.log(e)
        }
    }

    async borrar(id) {
        try {
            const contenido = await this.listarAll();
            let index = contenido.findIndex((prod) => prod.id == id);
            const prodRestantes = contenido.splice(index, 1);
            console.log(prodRestantes)
            return prodRestantes
        } catch (e) {
            console.log(e)
        }
    }

}

