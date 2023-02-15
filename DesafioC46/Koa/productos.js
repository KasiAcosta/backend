const Router = require('koa-router');

const router = new Router({
    prefix:'/productos'
});

let productos = [
    {
        "title": "NATUFARMA VALERIANA + VIT.B1 COM X 40",
        "price": "565",
        "thumbnail": "https://contenidos.redfarmashop.com/7795379100644_1.jpg",
        "description": "El betacaroteno es uno de los más importantes compuestos del grupo de los carotenoides. Es un pigmento natural que se encuentra en muchas frutas y verduras, particularmente la zanahoria.",
        "timestamp": 1660756252760,
        "stock": "42",
        "codigo": 641,
        "id": 1
    },
    {
        "title": "ORAL B CREMA 3D WHITE X70",
        "price": "452.70",
        "thumbnail": "https://contenidos.redfarmashop.com/7500435177030.jpg",
        "description": "Blancura en 3 dimensiones: ayuda a remover hasta 80% de manchas en sólo 2 semanas.",
        "timestamp": 1660756353012,
        "stock": "152",
        "codigo": 6483,
        "id": 2
    },
    {
        "title": "AVENO KIT BÁSICO CUIDADO INFANTIL",
        "price": "4430.40",
        "thumbnail": "https://contenidos.redfarmashop.com/PS022797.jpg",
        "description": "Aveno Kit Básico Cuidado Infantil Incluye :La linea Infantil de Aveno no tiene conservantes y no irrita los ojos.",
        "timestamp": 1660756439722,
        "stock": "47",
        "codigo": 7512,
        "id": 3
    },
    {
        "title": "AUCIC CAP X30",
        "price": "924.80",
        "thumbnail": "https://contenidos.redfarmashop.com/7795368002935.jpg",
        "description": "Un Suplemento Dietario a base de Omega 3 de aceite de pescado que favorece el mejor funcionamiento del sistema lagrimal de tus ojos y resulta un complemento ideal al tratamiento lubricante que estés utilizando.",
        "timestamp": 1660756528816,
        "stock": "75",
        "codigo": 2391,
        "id": 4
    },
    {
        "title": "BUCAL TAC PROCTECTOR PARA NIÑOS C/ CAJA CONTENEDORA",
        "price": "580.80",
        "thumbnail": "https://contenidos.redfarmashop.com/7798034746362.jpg",
        "description": "Ayuda a enderezar la mordida de los niños y aevitar el bruxismo",
        "timestamp": 1660756620886,
        "stock": "12",
        "codigo": 8344,
        "id": 5
    },
    {
        "title": "TRESEMME DETOX CAPILAR X 400 ML",
        "price": "579.80",
        "thumbnail": "https://contenidos.redfarmashop.com/7791293034751.jpg",
        "description": "CABELLO PURIFICADO, DESLUMBRANTE Y SALUDABLE EN CADA LAVADO. NUESTRA LÍNEA, SIN PARABENOS NI COLORANTES, PURIFICA EL CABELLO DE LOS RESIDUOS DIARIOS. ",
        "timestamp": 1660756716809,
        "stock": "109",
        "codigo": 5287,
        "id": 6
    }
]

//Rutas//

router.get('/', ctx =>{
    ctx.body = {
        status: 'success',
        message: productos,
    }
})

router.get('/:id', ctx =>{
    const getCurrentProd = productos.filter(function (productos){
        if(productos.id == ctx.params.id){
            return true
        }
    })

    if(getCurrentProd.length){
        ctx.body = getCurrentProd[0]
    }else{
        ctx.response.status = 404
        ctx.body = {
            status: 'error',
            message: 'No hay productos con ese Id'
        }
    }
})

router.post('/', ctx =>{
    if(
        !ctx.request.body.title ||
        !ctx.request.body.price ||
        !ctx.request.body.thumbnail ||
        !ctx.request.body.description ||
        !ctx.request.body.timestamp ||
        !ctx.request.body.stock ||
        !ctx.request.body.codigo ||
        !ctx.request.body.id 
        ){
            ctx.response.status = 400
            ctx.body = {
                status: "error",
                message: 'Error, ingresar los datos requeridos'
            }
        }else{
            const newProd = productos.push({

        title: ctx.request.body.title,
        price: ctx.request.body.price,
        thumbnail: ctx.request.body.thumbnail,
        description: ctx.request.body.description,
        timestamp: ctx.request.body.timestamp,
        stock: ctx.request.body.stock,
        codigo: ctx.request.body.codigo,
        id: ctx.request.body.id,
            })
            ctx.response.status = 201
            ctx.body = {
                status: 'success',
                message: `Nuevo producto cargado correctamente:
                ${ctx.request.body.title}`,
            }
        }
})

router.put('/update/:id', ctx =>{
    if(
        !ctx.request.body.title ||
        !ctx.request.body.price ||
        !ctx.request.body.thumbnail ||
        !ctx.request.body.description ||
        !ctx.request.body.timestamp ||
        !ctx.request.body.stock ||
        !ctx.request.body.codigo ||
        !ctx.request.body.id 
    ){
        ctx.response.status = 400
        ctx.body = {
            status: "error",
            message: 'Error, ingresar los datos requeridos'
    }
}else{
        const id = ctx.params.id
        const index = productos.findIndex(producto => producto.id == id)
        productos.splice(index, 1, ctx.request.body)
        ctx.response.status = 201
        ctx.body = {
            status: 'success',
            message: `Se actualizo el producto id:
            ${ctx.request.body.id} titulo: ${ctx.request.body.title}`,
        }
}})

router.delete('/delete/:id', ctx => {
    const id = ctx.params.id
    const index = productos.findIndex(producto => producto.id == id)
    productos.splice(index, 1)
    ctx.response.status = 200
    ctx.body = {
        status: 'success',
        message: `Se elimino el producto id: ${id}`,
    }
})