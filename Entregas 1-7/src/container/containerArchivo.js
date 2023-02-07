import fs from 'fs'
class ContainerArchivo {
    constructor(ruta) {
        this.ruta = ruta
    }

    async save(elemento) {
        try {
            this.array = await this.retrieve()
            if (this.array.length != 0) {
                let arrayId = this.array.map(item => item.id);
                let highId = Math.max(...arrayId);
                elemento.id = highId + 1;
            } else elemento.id = 0;
            this.array.push(elemento)
            const contenido = JSON.stringify(this.array, null, 4)
            await fs.promises.writeFile(this.ruta, contenido)
            return elemento
        } catch {
            return { error: "No se pudo guardar" }
        }

    }

    async retrieve() {
        try {
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            return JSON.parse(contenido)
        } catch {
            return []
        }
    }
    async retrieveId(id) {
        try {
            this.array = await this.retrieve()
            const objId = this.array.find(item => item.id == id)
            return (objId ? objId : { error: "producto no encontrado" })
        } catch {
            return { error: "No se ha encontrado el objeto" }
        }
    }

    async update(obj, id) {
        obj.id = parseInt(id);
        this.array = await this.retrieve()
        let find = this.array.find(item => item.id == id);
        if (find) {
            const auxArray = this.array.map(item => item.id == id ? obj : item);
            this.array.splice(0);
            this.array.push(...auxArray);
            const contenido = JSON.stringify(this.array, null, 4)
            await fs.promises.writeFile(this.ruta, contenido)
            return obj;
        } else {
            return { error: "No se ha encontrado el objeto" }
        }

    }

    async deleteId(id) {
        this.array = await this.retrieve()
        let find = this.array.find(item => item.id == id);
        if (find) {
            let auxArray = this.array.filter(item => item.id != id);
            this.array.splice(0);
            this.array.push(...auxArray);
            const contenido = JSON.stringify(this.array, null, 4)
            await fs.promises.writeFile(this.ruta, contenido)
            return (this.array);
        } else {
            return { error: "No se ha encontrado el objeto" }
        }
    }
}

export default ContainerArchivo;