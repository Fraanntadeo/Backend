import express, { Router } from 'express'
import producto from '../carritoYproductos/indexProductos.js'
import { soloParaAdmins } from './routerSesion.js'

const routerProd = new Router()
routerProd.use(express.json())
routerProd.use(express.urlencoded({ extended: true }))


//Ruta Madre:api/productos/
//api/productos/
routerProd.get("/", async (req, res) => {
    const prods = await producto.retrieve()
    res.json(prods)

})
//api/productos/:id
routerProd.get("/:id", async (req, res) => {

    const prods = await producto.retrieveId(req.params.id)
    res.json(prods)
})
//api/productos/
routerProd.post("/", soloParaAdmins, async (req, res) => {
    const obj = { ...req.body }
    const prods = await producto.save(obj)
    res.json(prods)
})
//api/productos/:id
routerProd.put("/:id", soloParaAdmins, async (req, res) => {
    const obj = { ...req.body }
    const prods = await producto.update(obj, req.params.id)
    res.json(prods)
})
//api/productos/:id
routerProd.delete("/:id", soloParaAdmins, async (req, res) => {
    const prods = await producto.deleteId(req.params.id)
    res.json(prods)
})

export default routerProd