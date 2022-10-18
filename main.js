const fs = require('fs')
class Contenedor {
    constructor(nombre) {
        this.algo = nombre;
    }
    async save(object) {
        let array = []
        try {
            const data = await fs.promises.readFile(this.algo, "utf-8")
            array = JSON.parse(data)
            let idArray = array.map(obj => obj.id)
            let highId = Math.max(...idArray)
            object.id = highId + 1;
            array.push(object);
            fs.writeFileSync(this.algo, JSON.stringify(array))
        }
        catch {
            object.id = 1;
            array.push(object);
            fs.writeFileSync(this.algo, JSON.stringify(array))
        }
        return object.id
    }
    async getById(number) {
        try {
            const data = await fs.promises.readFile(this.algo, "utf-8")
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
            const data = await fs.promises.readFile(this.algo, "utf-8")
            const array = JSON.parse(data)
            return array
        }
        catch {
            return null
        }
    }
    async deleteById(number) {
        try {
            const data = await fs.promises.readFile(this.algo, "utf-8")
            const array = JSON.parse(data)
            const newArray = array.filter(obj => obj.id !== number)
            fs.writeFileSync(this.algo, JSON.stringify(newArray))
        }
        catch {
            return "No hay nada"
        }
    }
    deleteAll() {
        fs.writeFileSync(this.algo, "")
    }
}

const nuevoArchivo = new Contenedor("./productos.txt");
nuevoArchivo.save({ title: "Zapatilla nike", price: 37800, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_815737-MLA49633340124_042022-O.webp" }).then(resolve => console.log(resolve));
nuevoArchivo.getById(1).then(resolve => console.log(resolve));
nuevoArchivo.getAll().then(resolve => console.log(resolve));
nuevoArchivo.deleteById(2);
nuevoArchivo.deleteAll();