import { collection, getDocs, query, orderBy, where, doc, getDoc } from "firebase/firestore";
import db from "./firebaseConfig";

export const firestoreFetchAll = async (idCategory) => {
  let q;
  if(idCategory) {
    q = query(collection(db, "data"), where("categoryId", "==", idCategory));
  } else {
    q = query(collection(db, "data"), orderBy("title"));
  }
  const querySnapshot = await getDocs(q);
  let firestoreData = querySnapshot.docs.map(document => ({
    id: document.id,
    ...document.data()
  }));
  if(firestoreData.length > 0) return firestoreData;
}

export const firestoreFetchOne = async (idProduct) => {
  const docRef = doc(db, "data", idProduct);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    return {
      id: idProduct,
      ...docSnap.data()
    }
  }
}