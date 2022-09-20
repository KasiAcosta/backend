const express = require("express")
const app = express()
const PORT = 8080
const routerProductos = express.Router()
const endpointInventarioProductos = "/api/productos"

const server = app.listen(PORT, () => {
	console.log(`Servidor iniciado escuchando en el puerto ${server.address().port}`)
})

server.on("error", error=>console.log(`Error en el servidor ${error}`))

class Producto{
	constructor (title, price, thumbnail){
		this.title = title
		this.price = price
		this.thumbnail = thumbnail
	}
}

class InventarioProductos{
	constructor (){
		this.productos = []
	}

	obtenerProductos(){
		return this.productos
	}

	agregarProducto(producto){
		let idProximo

		switch (this.productos.length) {
			case 0:
				idProximo = 1
				break
			case 1:
				idProximo = this.productos[0].id+1
				break
			default:
				idProximo = this.productos.sort((a,b)=>b.id-a.id)[0].id+1
				break
		}

		producto.id = idProximo
		return this.productos.push(producto)
	}

	obtenerProductoPorId(id){
		const productos = this.obtenerProductos()
		let producto = productos.filter(o=>o.id===parseInt(id))[0]
		return producto
    }

	deleteProductoPorId(id){
		const productos = this.obtenerProductos()
		this.productos = productos.filter(o=>o.id!==parseInt(id))
		return this.productos
    }

	actualizaProducto(id, producto){
		const pos = this.productos.map(prod => prod.id).indexOf(parseInt(id))
		if (pos!=-1){
			// solo actualizar las propiedades para las que venga información
			this.productos[pos].title = producto.title ?? this.productos[pos].title
			this.productos[pos].price = producto.price ?? this.productos[pos].price
			this.productos[pos].thumbnail = producto.thumbnail ?? this.productos[pos].thumbnail
		}				
		return this.productos
	}
}

const inventario = new InventarioProductos()

routerProductos.use(express.urlencoded({ extended: true }))
routerProductos.use(express.json())

routerProductos.get("/", (req, res) => {
	res.json(inventario.obtenerProductos())
})	

routerProductos.get("/:id", (req, res) => {
	res.json(inventario.obtenerProductoPorId(req.params.id)??{error:"producto no encontrado"})
})	

routerProductos.put("/:id", (req, res) => {
	if ((inventario.obtenerProductoPorId(req.params.id)??0)==0) {
		res.json({error:"producto no encontrado"})
	} else {
		let title = req.body.nombre
		let price = req.body.precio
		let thumbnail = req.body.logoProducto
	
		let producto = new Producto(title, price, thumbnail)
	
		res.json(inventario.actualizaProducto(req.params.id, producto))			
	}
})	

routerProductos.delete("/:id", (req, res) => {
	if ((inventario.obtenerProductoPorId(req.params.id)??0)==0) {
		res.json({error:"producto no encontrado"})
	} else {
		res.json(inventario.deleteProductoPorId(req.params.id))		
	}
})	

routerProductos.post("/", (req, res) => {
	let title = req.body.nombre
	let price = req.body.precio
	let thumbnail = req.body.logoProducto

	let producto = new Producto(title, price, thumbnail)
	res.json(inventario.agregarProducto(producto))
})

app.use(express.static("public"))
app.use(endpointInventarioProductos, routerProductos)