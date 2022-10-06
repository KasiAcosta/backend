import express from "express";
import Producto from "../clases/Producto.class.js";

const router = express.Router();

const producto = new Producto();

function validarAdmin(req, res, next){
    if (req.query.admin) {
        next();
    }else {res.send("uds no tiene access");
    }
}

router.post("/", validarAdmin,(req, res) =>{
    console.log(req.body);
    const productoCreado = producto.guardar(req.body);
    res.send(productoCreado);
});

router.delete("/:id", validarAdmin, (req, res) =>{
    const productoBorrado = producto.borrar(req.params.body);
    res.send(productoBorrado);
});

router.get("/", (req, res) =>{
    const listaProducto = producto.listarAll();
    res.send(listaProducto);
});

router.get("/:id", (req, res) => {
    const productoBuscado = producto.listar(req.params.id);
    res.send(productoBuscado);
});

export default router;
