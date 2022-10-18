const socket = io.connect();

socket.on("productos", (data) =>{
    render(data);
});

function render(data){
    const html = data.map((elemento) =>{
        return `
        <div>
             <h3>${elemento.title}</h3>
            <p>$ ${elemento.price}</p>
            <p> id: ${elemento.id}</p>
            <img> ${elemento.thumbnail}</img>
        </div>
        `;
    }).join(" ");
    document.getElementById("productos").innerHTML = html;
};

socket.on("mensajes", (msj) =>{
    renderM(msj);
});

function renderM(msj){
    const html = msj.map((elementos) =>{
        return `
        <div>
             <h3>${elementos.mail}</h3>
             <p> id: ${elementos.id}</p>
            <p>$ ${elementos.mensaje}</p>
            <p> id: ${elementos.fecha}</p>
            
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