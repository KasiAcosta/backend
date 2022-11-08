const { Router } = require ("express");
const { createFakerProducts } = require ("../controllers/products.js")

const routerProducto = Router();

routerProducto.
    route('/productos-test')
    .get(async (req, res) => {
        const products = await createFakerProducts();
        if(products.length > 0){
            res.status(200).json(products);
        }else{
            res.status(404).send({ message: "Productos no encontrados"})
        }
    })

    module.exports = routerProducto;