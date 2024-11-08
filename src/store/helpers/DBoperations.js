import {db,storage } from '@/firebase-config.js'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, collection, getDocs, addDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore/lite'	

class FDBOperation{
    constructor(){
        this.dbCollection = collection(db, 'todo')
    }
    snapShotToList(snapShot){
        const snapList = []
        snapShot.docs.forEach(doc => {
            snapList.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return snapList
    }
    dbSnapshot(){
        return new Promise((resolve, reject) => {getDocs(this.dbCollection)
            .then((dataSnapshot) => {resolve(this.snapShotToList(dataSnapshot))})
            .catch((error)=>{reject(error)})})
    }
    async uploadImage(file) {
        const storageRef = ref(storage, `images/${file.name}`);
        try {
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          return downloadURL; 
        } catch (error) {
          throw new Error("Error uploading image: " + error.message);
        }
      }
      async dbAddItem(item, images) {
        try {
          const imageURLs = await Promise.all(images.map((file) => this.uploadImage(file)));
          const itemWithImages = { ...item, images: imageURLs }; 
          await addDoc(this.dbCollection, itemWithImages);
          return true;
        } catch (error) {
          throw new Error("Error adding item: " + error.message);
        }
      }
    dbDeleteItem(id){

        return new Promise((resolve, reject)=>{deleteDoc(doc(this.dbCollection,id))
            .then(()=>{resolve(true)})
            .catch((error)=>{reject(error)})})
    }
    dbUpdate(itemId,data){
        const oldItem = doc(this.dbCollection, itemId)
        return new Promise((resolve, reject)=>{
            updateDoc(oldItem,data)
            .then(()=>{resolve(true)})
            .catch((error)=>{reject(error)})
        })
    }
    dbLoadFromRequest(fieldTitle,compareOperator,request){
        const compared = query(this.dbCollection,where(fieldTitle,compareOperator,request))
        return new Promise((resolve, reject)=>{getDocs(compared)
            .then((dataSnapshot)=>{resolve(this.snapShotToList(dataSnapshot))})
            .catch((error)=>reject(error))})
    }
}
export default FDBOperation
