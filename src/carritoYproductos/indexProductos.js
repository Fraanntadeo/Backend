import typeDB from "./typeDB.js"
let productoDao
switch (typeDB) {
    case 'json':
        const { default: ProductoDaoArchivo } = await import('./productos/productosArchivo.js')
        productoDao = new ProductoDaoArchivo("./DB")
        break
    case 'firebase':
        const { default: ProductoDaoFirebase } = await import('./productos/productosFirebase.js')
        productoDao = new ProductoDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductoDaoMongoDb } = await import('./productos/productosMongo.js')
        productoDao = new ProductoDaoMongoDb()
        break
    default:
        const { default: ProductoDaoMem } = await import('./productos/productosMemoria.js')
        productoDao = new ProductoDaoMem()
        break
}

export default productoDao