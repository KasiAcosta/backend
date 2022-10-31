import mongoose from "mongoose";


const carritoSchema = new mongoose.Schema({
    id: Number,
    timestamp : Number,
    productos: Array
});

const CarritoModel = mongoose.model('carrito', carritoSchema)
export default CarritoModel