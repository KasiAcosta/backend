const socket = io.connect();

socket.on("productos", (data) =>{
    render(data);
});

function render(data){
    const html = data.map((elemento) =>{
        return `
        <div>
             <h3>${elemento.titulo}</h3>
            <p>$ ${elemento.precio}</p>
        </div>
        `;
    }).join(" ");
    document.getElementById("productos").innerHTML = html;
};

function render(msj){
    const html = msj.map((elementos) =>{
        return `
        <div>
             <h3>${elementos.mail}</h3>
            <p>$ ${elementos.mensaje}</p>
        </div>
        `;
    }).join(" ");
    document.getElementById("mensajes").innerHTML = html;
};

function addProd(e){
    const producto = {
        titulo: document.getElementById("titulo").value,
        precio: document.getElementById("precio").value,
    };

    socket.emit("new-producto", producto);
    return false;
}   ;

function addMsj(e){
    const mensaje = {
        mail: document.getElementById("mail").value,
        mensaje: document.getElementById("mensaje").value,
    };

    socket.emit("new-mensaje", mensaje);
    return false;
}  