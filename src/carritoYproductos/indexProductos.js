import typeDB from "./typeDB.js"
let producto
switch (typeDB) {
    case 'json':
        const { default: ProductoArchivo } = await import('./productos/productosArchivo.js')
        producto = new ProductoArchivo("./DB")
        break
    case 'firebase':
        const { default: ProductoFirebase } = await import('./productos/productosFirebase.js')
        producto = new ProductoFirebase()
        break
    case 'mongodb':
        const { default: ProductoMongoDb } = await import('./productos/productosMongo.js')
        producto = new ProductoMongoDb()
        break
    default:
        const { default: ProductoMem } = await import('./productos/productosMemoria.js')
        producto = new ProductoMem()
        break
}

export default producto