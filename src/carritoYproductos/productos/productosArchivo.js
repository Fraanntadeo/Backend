import ContainerArchivo from "../../container/containerArchivo.js"
class ProductosArchivo extends ContainerArchivo {
    constructor(rutaDir) {
        super(`${rutaDir}/productos.json`)
    }
}

export default ProductosArchivo