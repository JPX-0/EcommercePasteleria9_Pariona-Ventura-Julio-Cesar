import ItemDetail from "./ItemDetail";
import { firestoreFetchOne } from "../../../utils/firestoreFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// ItemDetailContainer -- se renderiza el titulo de la pagina actual, y transfiere los datos a un componente hijo.
const ItemDetailContainer = () => {
  const [dat, setDat] = useState([])
  const {idProduct} = useParams()
  useEffect(() => {
    firestoreFetchOne(idProduct)
    .then((res) => setDat(res))
    .catch(err => console.log(err))
  }, [idProduct])
  return (
    <>
      <h1 className="main__title">Detalle del producto:</h1>
      <ItemDetail content={dat}/>
    </>
  )};
  export default ItemDetailContainer;