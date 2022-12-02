import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://Prueba:Messi@cluster0.r53ktcl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
await client.connect()

class ContainerMongo {
    constructor(nameCollection) {
        this.dataBase = client.db("ecommerce").collection(nameCollection)
    }

    async save(newElement) {
        try {
            await this.dataBase.insertOne(newElement);
            return newElement
        } catch {
            return { error: "no se ha podido guardar el elemento" }
        }

    }
    async retrieve() {
        try {
            const elements = await this.dataBase.find().toArray()
            return elements
        } catch {
            return { error: "coleccion no encontrada" }
        }

    }

    async retrieveId(id) {
        try {
            const _id = new ObjectId(id);
            const element = await this.dataBase.findOne({ _id })
            return element ?? { info: "elemento no encontrado por id" }
        } catch (error) {
            return { error: "error al buscar" }
        }
    }
    async update(obj, id) {
        try {
            const _id = new ObjectId(id);
            obj._id = _id
            await this.dataBase.replaceOne({ _id }, obj);
            return obj
        } catch (error) {
            return { error: "elemento no encontrado para actualizar" }
        }
    }
    async deleteId(id) {
        try {
            const _id = new ObjectId(id);
            await this.dataBase.deleteOne({ _id });
            return { exito: "elemento borrado" }
        } catch {
            return { error: "Elemento no encontrado para borrar" }
        }

    }

    async discontect() {
        await client.close();
    }
}
export default ContainerMongo;