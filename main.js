const fs = require('fs')
const express = require('express');


class Contenedor {
    constructor(nombre) {
        this.object = nombre;
    }
    async save(object) {
        let array = []
        try {
            const data = await fs.promises.readFile(this.object, "utf-8")
            array = JSON.parse(data)
            let idArray = array.map(obj => obj.id)
            let highId = Math.max(...idArray)
            object.id = highId + 1;
            array.push(object);
            fs.writeFileSync(this.object, JSON.stringify(array))
        }
        catch {
            object.id = 1;
            array.push(object);
            fs.writeFileSync(this.object, JSON.stringify(array))
        }
        return object.id
    }
    async getById(number) {
        try {
            const data = await fs.promises.readFile(this.object, "utf-8")
            let array = JSON.parse(data)
            const object = array.find(obj => obj.id === number)
            return object
        }
        catch {
            return null
        }
    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.object, "utf-8")
            const array = JSON.parse(data)
            return array
        }
        catch {
            return null
        }
    }
    async deleteById(number) {
        try {
            const data = await fs.promises.readFile(this.object, "utf-8")
            const array = JSON.parse(data)
            const newArray = array.filter(obj => obj.id !== number)
            fs.writeFileSync(this.object, JSON.stringify(newArray))
        }
        catch {
            return "No hay nada"
        }
    }
    deleteAll() {
        fs.writeFileSync(this.object, "")
    }
}

const nuevoArchivo = new Contenedor("./productos.json");
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.end("Bienvenido a ...!")
})
app.get('/productos', (req, res) => {
    nuevoArchivo.getAll().then(resolve => {
        res.end(`todo los productos: ${JSON.stringify(resolve)}`)
    });

})
app.get('/productoRandom', (req, res) => {
    let fRandom = parseInt((Math.random() * 4) + 1)
    nuevoArchivo.getById(fRandom).then(resolve => {
        res.end(`producto random: ${JSON.stringify(resolve)}`)
    });
})