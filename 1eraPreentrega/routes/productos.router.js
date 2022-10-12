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

router.post("/", validarAdmin, async (req, res) =>{
    console.log(req.body);
    const productoCreado = await producto.guardar(req.body);
    res.send(productoCreado);
});

router.delete("/:id", validarAdmin, async (req, res) =>{
    const productoBorrado = await producto.borrar(req.params.body);
    res.send(productoBorrado);
});

router.get("/", async (req, res) =>{
    const listaProducto = await producto.listarAll();
    res.send(listaProducto);
});

router.get("/:id", async (req, res) => {
    const productoBuscado = await producto.listar(req.params.id);
    res.send(productoBuscado);
});

export default router;
