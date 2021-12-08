import ItemCount from "../buttons/ItemCount";
// descomentar esto ↓↓↓
// import db from "../../../utils/firebaseConfig";
// import { doc, increment, updateDoc } from "@firebase/firestore";
// descomentar esto ↑↑↑
import { CartContext } from "../cart/CartContext";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

// ItemDetail -- se renderiza todos los detalles del producto.
const ItemDetail = (props) => {
  const [itemCount, setItemCount] = useState(0)
  const test = useContext(CartContext);
  // onAdd -- se envía el producto seleccionado al carrito.
  const onAdd = (cantProd) => {
    alert(`Se agregó al carrito ${cantProd} productos`);
    setItemCount(cantProd);
    test.addItem(props.content, cantProd);
    // descomentar esto ↓↓↓
    // const itemRef = doc(db, "data", props.content.id);
    // updateDoc(itemRef, {
    //   stock: increment(- cantProd)
    // })
    // descomentar esto ↑↑↑
  }
  return (
    <>
      {
        // se comprueba si la data llega o no.
        props.content ?
          // se espera a que la data termine de cargar.
          props.content.length !== 0 ?
          <section className="detail">
            <picture className="card__picture">
              <img src={props.content.pictureURL} alt={props.content.title} className="card__img"/>
            </picture>
            <article>
              <h2 className="card__title">{props.content.title}</h2>
              <p className="card__price">${props.content.price} x U</p>
              <p className="card__description">{props.content.description}</p>
            </article>
            {
              // se espera a que el cliente realize su pedido para mostrarle el boton de ir al carrito.
              itemCount > 0 ?
              <>
                <Link to="/cart" className="btn btn__addToCar">Terminar mi compra</Link>
                <Link to="/" className="btn btn__link btn__link--black">Seguir comprando</Link>
              </> :
              <ItemCount stock={props.content.stock} initial={itemCount} price={props.content.price} id={props.content.id} onAdd={onAdd}/>
            }
          </section> :
          <p className="msg msg__cargando"></p> :
        <p className="msg__error"></p>
      }
    </>
  )};
  export default ItemDetail;