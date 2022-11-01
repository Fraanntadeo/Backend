const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "public"))
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor iniciando en: http://localhost:${PORT}`)
})
const { Router } = express;
const productosRouter = new Router();
productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))
server.on("error", error => console.log(`Error en servidor ${error}`))
const handleVerify=(atributo)=>{
    return (atributo!="") 
}
const productos = []
productosRouter.get("/", (req, res) => {
    res.render("pages/productos", {productos})
})
app.get("/", (req, res) => {
    res.render("pages/formu",{titlePage:"Formulario"})
})
productosRouter.post("/", (req, res) => {
    let objeto = req.body;
    const veri = handleVerify(objeto.title)&&handleVerify(objeto.price)&&handleVerify(objeto.thumbnail);
    if(veri){
        if (productos.length != 0) {
            let arrayId = productos.map(item => item.id);
            let highId = Math.max(...arrayId);
            objeto.id = highId + 1;
        } else objeto.id = 1;
        productos.push(objeto);
    }
    res.redirect('/')
})

app.use("/api/productos", productosRouter);
app.use('/static', express.static('public'));
app.use((req, res, next) => {
    res.status(404).send("Que buscas?");
})