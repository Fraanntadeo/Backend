import ContainerArchivo from "../../container/containerArchivo.js"

class CarritoArchivo extends ContainerArchivo {
    constructor(rutaDir) {
        super(`${rutaDir}/carrito.json`)
    }

}

export default CarritoArchivo;