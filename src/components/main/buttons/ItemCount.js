import { useState } from "react";

// ItemCount -- se renderiza los botones para aumentar o disminuir el numero de productos a seleccionar.
const ItemCount = (props) => {
  let valInitial = 0
  const [products, setProducts] = useState(valInitial);
  // increment -- aumenta la cantidad de productos seleccionados.
  const increment = () => {
    if(products < props.stock) setProducts(products + 1);
  }
  // decrement -- disminuye la cantidad de productos seleccionados.
  const decrement = () => {
    if(products > valInitial + 1) setProducts(products - 1);
  }
  return (
    <>
      <div className="card__buttons">
        <button onClick={decrement} className="btn btn__count">-</button>
        <p className="card__products">Productos: {products} / {props.stock}</p>
        <button onClick={increment} className="btn btn__count">+</button>
      </div>
      {
        // se espera a que cargue el numero de stock.
        props.stock &&
        // se habilita/inhabilita el boton para agregar el producto seleccionado al carrito.
        products ?
        <button className="btn btn__addToCar" onClick={() => props.onAdd(products)}>Agregar al carrito</button> :
        <button className="btn btn__addToCar btn__addToCar--inactive">Agregar al carrito</button>
      }
    </>
  )};
export default ItemCount;