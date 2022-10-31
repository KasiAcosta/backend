import express from "express";
import Carrito from "../DAOs/Carrito.dao.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) =>{
    const carritoCreado = await carrito.crearCarrito();
    res.send(carritoCreado);
});

router.delete("/:id", (req, res) =>{
    const carrito = carrito.borrar(req.params.id);
    res.send(carrito);
});

router.get("/", async (req, res) => {
    const listaCarritos = await carrito.listarAll();
    res.send(listaCarritos);
});

router.post("/:id/productos", async (req, res) =>{
    const prodCart = await carrito.guardarProductoEnCarrito(
        req.params.id,
        req.body
    );
    res.send(prodCart);
});

export default router;