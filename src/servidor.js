const express = require('express');
const http = require('http');
const { routerProd, routerCarr, routerSesion } = require('./router.js')
const app = express();
const httpServer = new http.Server(app)


app.use('/api/sesion/', routerSesion)
app.use('/api/productos/', routerProd)
app.use('/api/carrito/', routerCarr)
app.all('*', (req, res) => {
    const text = `ruta ${req.originalUrl},metodo ${req.method} no implementada`
    res.status(404).json({ error: -2, descripcion: text })
})

module.exports = { servidor: httpServer }