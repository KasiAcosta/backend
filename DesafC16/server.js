const express = require("express");



const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');


const { Productos } = require("./productos.class");
const { Mensajes } = require("./mensajes.class");

const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'))
app.get('/', (req, res) =>{
    res.sendFile('index.html')
});

const productos = new Productos();
const mensajes = new Mensajes();

app.set("socketio", io);
io.on("connection", async(socket) =>{
    console.log("Nuevo Usuario Conectado");

    socket.emit("productos", await productos.getAll());
    socket.on("producto", async (data) => {
        await productos.save(data);
        io.sockets.emit("productos", await productos.getAll());
    });

    socket.emit("mensajes", await mensajes.getAll());
    socket.on("mensaje", async (msj) => {
        const fecha = new Date();
        await mensajes.save({
            ...msj,
            fecha: fecha.toLocaleString("es-AR"),
        });
        io.sockets.emit("mensajes", await mensajes.getAll());
    });
});

httpServer.listen(PORT, () => console.log(`servidor levantado en el puerto ${PORT}`));