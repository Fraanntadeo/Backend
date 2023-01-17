import ContainerMongo from "../../container/containerMongo.js";

class ProductosMongoose extends ContainerMongo {
    constructor() {
        super('productos');
    }
}

export default ProductosMongoose