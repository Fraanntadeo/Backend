import { collection, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/configFireBase.js'
class ContainerFirebase {
    constructor(nombreColeccion) {
        this.coleccion = nombreColeccion
    }
    async save(newElement) {
        const newOrderRef = doc(collection(db, this.coleccion))
        await setDoc(newOrderRef, newElement);
        newElement.id = newOrderRef.id;
        return newElement
    }
    async retrieve() {
        try {
            const querySnapshot = await getDocs(collection(db, this.coleccion));
            const elements = querySnapshot.docs.map(item => ({
                id: item.id,
                ...item.data()
            }))
            return elements
        } catch (error) {
            return { error: "Collecion no encontrada" }
        }

    }

    async retrieveId(id) {
        try {
            const docSnap = await getDoc(doc(db, this.coleccion, id))
            let prod = { id: id, ...docSnap.data() }
            return prod
        } catch {
            return { error: "Elemento no encontrado" };
        }
    }
    async update(newElement, id) {
        const element = await this.retrieveId(id);
        if (!element.error) {
            const itemRef = doc(db, this.coleccion, element.id)
            await updateDoc(itemRef, { ...newElement });
            return newElement
        } else {
            return { error: "Elemento no encontrado para actualizar" };
        }
    }

    async deleteId(id) {
        try {
            const itemRef = doc(db, this.coleccion, id)
            await deleteDoc(itemRef)
            return { msg: "Su elemento ha sido borrado" }
        } catch (error) {
            return { error: "Elemento no encontrado para borrar" };
        }

    }

}
export default ContainerFirebase;