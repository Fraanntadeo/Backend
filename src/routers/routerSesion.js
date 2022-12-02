import { Router } from 'express'
const routerSesion = new Router()

let admin = true;

//Verify if admin is true?
export function soloParaAdmins(req, res, next) {
    if (admin) {
        next()
    } else {
        const text = `ruta ${req.originalUrl},metodo ${req.method} no autorizada`
        res.json({ error: -1, descripcion: text })
    }
}
//Ruta Madre:api/sesion/
//api/sesion/login
routerSesion.get('/login', (req, res) => {
    admin = true
    res.sendStatus(200)
})
//api/sesion/logout
routerSesion.get('/logout', (req, res) => {
    admin = false
    res.sendStatus(200)
})

export default routerSesion;

