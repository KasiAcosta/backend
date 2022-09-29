const express = require ("express");
const PORT = 8080;
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.sendFile('index.html')
});

const productos =[
    {
        titulo: "tomates",
        precio: "$250",
    },
    {
        titulo: "peras",
        precio: "$200",
    }
];
const mensajes = [];

io.on('connection', (socket) =>{
    console.log('cliente connected');

    socket.emit("productos", productos);
        socket.on("new-producto", (data) => {
        productos.push(data);
        io.sockets.emit("productos", productos);
    });

    socket.emit("mensajes", mensajes);

    socket.on("new-mensaje", (msj) =>{
        mensajes.push(msj);
        io.sockets.emit("mensajes", mensajes)
    });
});

httpServer.listen(8080, () => console.log('servidor levantado'));