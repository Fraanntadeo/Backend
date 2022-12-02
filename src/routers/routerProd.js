import express, { Router } from 'express'
import productoDao from '../carritoYproductos/indexProductos.js'
import { soloParaAdmins } from './routerSesion.js'

const routerProd = new Router()
routerProd.use(express.json())
routerProd.use(express.urlencoded({ extended: true }))


//Ruta Madre:api/productos/
//api/productos/
routerProd.get("/", async (req, res) => {
    const prods = await productoDao.retrieve()
    res.json(prods)

})
//api/productos/:id
routerProd.get("/:id", async (req, res) => {

    const prods = await productoDao.retrieveId(req.params.id)
    res.json(prods)
})
//api/productos/
routerProd.post("/", soloParaAdmins, async (req, res) => {
    const obj = { ...req.body }
    const prods = await productoDao.save(obj)
    res.json(prods)
})
//api/productos/:id
routerProd.put("/:id", soloParaAdmins, async (req, res) => {
    const obj = { ...req.body }
    const prods = await productoDao.update(obj, req.params.id)
    res.json(prods)
})
//api/productos/:id
routerProd.delete("/:id", soloParaAdmins, async (req, res) => {
    const prods = await productoDao.deleteId(req.params.id)
    res.json(prods)
})

export default routerProd