import express, { Router } from 'express'
import carrito from '../carritoYproductos/indexCarrito.js'
import producto from '../carritoYproductos/indexProductos.js'
import typeDB from '../carritoYproductos/typeDB.js'
const routerCarr = new Router()
routerCarr.use(express.json())
routerCarr.use(express.urlencoded({ extended: true }))


//Ruta Madre:apí/carrito/
//apí/carrito/
routerCarr.post("/", async (req, res) => {
    const carrito = { productos: [] }
    await carrito.save(carrito)
    res.json(carrito)
})

//apí/carrito/:id
routerCarr.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const carrito = await carrito.retrieveId(id)
    carrito.productos = []
    const arrayCarrito = await carrito.update(carrito, id)
    res.json(arrayCarrito)
})

//apí/carrito/:id/productos
routerCarr.get("/:id/productos", async (req, res) => {
    const id = req.params.id;
    const carrito = await carrito.retrieveId(id)
    res.json(carrito.productos)
})
//apí/carrito/:id/productos/
routerCarr.post("/:id/productos", async (req, res) => {
    const id = req.params.id;
    const id_prod = req.body.id;
    const carrito = await carrito.retrieveId(id)
    const prod = await producto.retrieveId(id_prod)
    const find = carrito.productos.find(item => item.id == prod.id)
    if (!find && prod.error == undefined) {
        carrito.productos.push(prod);
        const arrayCarrito = await carrito.update(carrito, id)
        res.json(arrayCarrito)
    } else {
        res.json(carrito)
    }

})
//apí/carrito/:id/productos/:id_prod
routerCarr.delete("/:id/productos/:id_prod", async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carrito = await carrito.retrieveId(id)
    let arrayAuxy
    if (typeDB == "mongodb") {
        arrayAuxy = carrito.productos.filter(item => item._id != id_prod);
    } else {
        arrayAuxy = carrito.productos.filter(item => item.id != id_prod);
    }
    carrito.productos.splice(0)
    carrito.productos.push(...arrayAuxy)
    const arrayCarrito = await carrito.update(carrito, id)
    res.json(arrayCarrito)

})

export default routerCarr
