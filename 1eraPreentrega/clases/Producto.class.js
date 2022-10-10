import fs from "fs";

export default class Producto{
    static productos = [];
    constructor(){
        this.id = 0;
    }

    async guardar(prod){
        try{
        prod.id = ++this.id;
        prod.timeStamp = Date.now();
        Producto.productos.push(prod);
        await fs.promises.writeFile(
            "./productosList.txt",
            JSON.stringify(Producto.productos, null, 2),
            "utf-8"
        )
        return prod;
    } catch (e){
        console.log(e);
    }
    }

    listar(id){
        let producto = Producto.productos.find((prod) => prod.id == id);
        return producto || { error: "producto no encontrado"};
    }

    listarAll(){
        return Producto.productos.length
        ? Producto.productos
        : { error: "no hay productos cargados"};
    }

    

    actualizar(prod, id){
        prod.id = Number(id);
        let index = Producto.productos.findIndex((prod) => prod.id == id);
        Producto.productos.splice(index, 1, prod);
    }

    borrar(id){
        let index = Producto.productos.findIndex((prod) => prod.id == id);
        return Producto.productos.splice(index, 1);
    }

}

