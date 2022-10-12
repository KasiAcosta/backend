import express from "express";
import Carrito from "../clases/Carrito.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) =>{
    const carritoCreado = await carrito.crearCarrito();
    res.send(carritoCreado);
});

router.delete("/:id", async (req, res) =>{
    const carrito = await carrito.borrar(req.params.id);
    res.send(carrito);
});

router.get("/", async (req, res) => {
    res.type('json')
    const listaCarritos = await carrito.listarAll();
    res.send(listaCarritos);
});

router.post("/:id/productos/:idPrd", async (req, res) =>{
    const carritoBorrado = await carrito.guardarProductoEnCarrito(
        req.params.idPrd,
        req.params.id
    );
    res.send(carritoBorrado);
});

export default router;