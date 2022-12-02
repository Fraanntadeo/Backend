import express from 'express'
import http from 'http'
import routerCarr from './routers/routerCarr.js';
import routerProd from './routers/routerProd.js';
import routerSesion from './routers/routerSesion.js';

const app = express();
export const httpServer = new http.Server(app)

app.use('/api/sesion/', routerSesion)
app.use('/api/productos/', routerProd)
app.use('/api/carrito/', routerCarr)

//not found page
app.all('*', (req, res) => {
    const text = `ruta ${req.originalUrl},metodo ${req.method} no implementada`
    res.status(404).json({ error: -2, descripcion: text })
})
