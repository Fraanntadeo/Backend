class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    retrieveId(id) {
        console.log(id);
        const elem = this.elementos.find(elem => elem.id == id)
        console.log(elem);
        if (!elem) {
            throw new Error(`Error al listar: elemento no encontrado`)
        } else {
            return elem
        }
    }

    retrieve() {
        return [...this.elementos]
    }

    save(newObj) {
        if (this.elementos.length != 0) {
            let arrayId = this.elementos.map(item => item.id);
            let highId = Math.max(...arrayId);
            newObj.id = highId + 1;
        } else newObj.id = 0;
        this.elementos.push(newObj)
        return newObj
    }

    update(elem, id) {
        const index = this.elementos.findIndex(p => p.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: elemento no encontrado`)
        } else {
            elem.id = parseInt(id);
            this.elementos[index] = elem;
            return elem;
        }
    }

    deleteId(id) {
        const buscar = this.elementos.find(element => element.id == id)
        if (!buscar) {
            throw new Error(`Error al borrar: elemento no encontrado`)
        } else {
            this.elementos = this.elementos.filter(obj => obj.id != id)
            return this.elementos
        }
    }

    borrarAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria