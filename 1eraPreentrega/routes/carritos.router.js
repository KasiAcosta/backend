import express from "express";
import Carrito from "../clases/Carrito.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", (req, res) =>{
    const carritoCreado = carrito.crearCarrito();
    res.send(carritoCreado);
});

router.delete("/:id", (req, res) =>{
    const carrito = carrito.borrar(req.params.id);
    res.send(carrito);
});

router.get("/", (req, res) => {
    const listaCarritos = carrito.listarAll();
    res.send(listaCarritos);
});

router.post("/:id/productos/:idPrd", (req, res) =>{
    const carritoBorrado = carrito.guardarProductoEnCarrito(
        req.params.idPrd,
        req.params.id
    );
    res.send(carritoBorrado);
});

export default router;