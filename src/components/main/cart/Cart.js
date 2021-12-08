import db from "../../../utils/firebaseConfig";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { SiShopify } from "react-icons/si";
import { collection, setDoc, doc, updateDoc, increment } from "firebase/firestore";
import { useContext, useState } from "react";

// Cart -- se renderiza el carrito con los productos seleccionados por el cliente.
const Cart = () => {
  const test = useContext(CartContext);
  const [product, setProduct] = useState([]);
  const [btnVar, setBtnVar] = useState(false);
  // deleteItem -- abre el modal de confirmacion para eliminar algun producto.
  const deleteItem = (itemId) => {
    const asideAlert = document.querySelector(".aside");
    let productFound = test.cartList.find(item => item.idItem === itemId);
    setBtnVar(true);
    setProduct(productFound);
    asideAlert.classList.add("aside--active");
  }
  // deleteItems -- abre el modal de confirmacion para eliminar todos los productos.
  const deleteItems = () => {
    const asideAlert = document.querySelector(".aside");
    setBtnVar(false);
    asideAlert.classList.add("aside--active");
  }
  // btnCancel -- se cancela eliminar los productos seleccionados.
  const btnCancel = () => {
    const asideAlert = document.querySelector(".aside");
    asideAlert.classList.remove("aside--active");
  }
  // btnConfirm -- se acepta eliminar los productos seleccionados.
  const btnConfirm = () => {
    const asideAlert = document.querySelector(".aside");
    asideAlert.classList.remove("aside--active");
    if(btnVar === true) {
      test.removeItem(product.idItem); // elimina el producto seleccionado del carrito.
    } else if(btnVar === false){
      test.clear(); // elimina todos los productos del carrito.
    }
    // descomentar esto ↓↓↓
    // test.cartList.forEach( async(item) => {
    //   const itemRef = doc(db, "data", item.idItem);
    //   await updateDoc(itemRef, {
    //     stock: increment(item.qtyItem)
    //   })
    // });
    // descomentar esto ↑↑↑
  }
  // createOrder -- se crea una nueva orden con los productos comprados
  const createOrder = () => {
    let order = {
      // se crea un usuario hardcodeado para realizar la compra.
      buyer: {
        name: "nombre",
        email: "@hotmail",
        creditCard: "num"
      },
      // se muestra la lista de productos comprados.
      items: test.cartList.map(item => ({
        id: item.idItem,
        title: item.nameItem,
        price: item.priceItem,
        quantity: item.qtyItem
      })),
      // se muestra el monto total de pago.
      total: test.calcTotalFinal()
    };
    // se crea una nueva coleccion en Firebase.
    const createOrderInFirebase = async() => {
      const newOrderRef = doc(collection(db, "orders"));
      await setDoc(newOrderRef, order);
      return newOrderRef
    }
    // se llama a la nueva coleccion de Firebase para mostrar el ID de compra.
    createOrderInFirebase()
      .then(res => alert(`Su pedido ha siddo creado, porfavor guarde el ID de su compra \n \n ID: ${res.id}`))
      .catch(err => console.log(err))
    // comentar esto ↓↓↓
    test.cartList.forEach( async(item) => {
      const itemRef = doc(db, "data", item.idItem); // se identifica el ID de los productos comprados.
      await updateDoc(itemRef, {
        stock: increment(-item.qtyItem) // se disminuye el número de stock con el número de prodcutos seleccionados por el usuario.
      })
    });
    // comentar esto ↑↑↑
    test.clear() // elimina todos los productos del carrito.
  }
  return (
    <>
      <h1 className="main__title">Este es el carrito</h1>
      {
        // se comprueba que la data tenga algun producto seleccionado.
        test.cartList.length > 0 ?
        <>
          <section className="cart">
            <section className="cart--first">
              <section className="cart--top">
                <p className="cart__table center">Imagen</p>
                <p className="cart__table cart--division center">Nombre</p>
                <p className="cart__table cart--division center">Precio x U</p>
              </section>
              <section className="cart--middle">
                {
                  // se mapea la lista recibida.
                  test.cartList.map(elem => 
                  <figure key={`figureCart${elem.idItem}`} className="cart__figure">
                    <Link to={`/item/${elem.idItem}`} title="da 'click' para ir al producto">
                      <picture className="cart__picture cart__table">
                        <img src={elem.imgItem} alt={elem.nameItem} className="card__img"/>
                      </picture>
                    </Link>
                    <h2 className="cart__table cart--division center" title={elem.nameItem}><span>{elem.nameItem}</span></h2>
                    <div className="cart__table cart--division center">
                      <p>${elem.priceItem} x {elem.qtyItem}</p>
                      <p>${elem.priceItem * elem.qtyItem}</p>
                    </div>
                    <div className="cart__table cart--division center">
                      <button className="btn" title="Eliminar este producto." onClick={() => deleteItem(elem.idItem)}><AiFillDelete/></button>
                    </div>
                  </figure>
                  )
                }
              </section>
              <section className="cart--bottom">
                <button className="btn btn__addToCar" onClick={deleteItems}>Borrar Carrito <MdOutlineDeleteSweep/></button>
              </section>
            </section>
            <section className="cart--second">
              <section className="cart__container">
                <p className="cart__table">Detalles de la compra</p>
                <p className="cart__table">Precio toal:</p>
                <p className="cart__table">${test.calcTotal()}</p>
                <p className="cart__table">IVA (19.2%):</p>
                <p className="cart__table">${test.calcIva()}</p>
                <p className="cart__table">Precio Final:</p>
                <p className="cart__table cart--division">$.{test.calcTotalFinal()}</p>
                <div className="cart--bottom">
                  <button className="btn btn__addToCar" onClick={createOrder}>Comprar <SiShopify/></button>
                </div>
              </section>
            </section>
            <aside className="aside">
              <section className="alert">
                {
                  // se comprueba si se pide eliminar un producto o todos los productos.
                  btnVar ?
                  <p className="alert__text">¿Está seguro/a que desea eliminar <span>{product.nameItem}</span>?</p> :
                  <p className="alert__text">¿Está seguro/a que desea limpiar su carrito?</p>
                }
                <button className="btn btn__cancel" onClick={btnCancel}>Cancelar</button>
                <button className="btn btn__confirm" onClick={btnConfirm}>Confirmar</button>
              </section>
            </aside>
          </section>
        </> :
        <p>El carrito está vacio, regrese a la página de <Link to="/" className="btn__link btn__link--blue">Inicio</Link> y ralize sus pedidos.</p>
      }
    </>
  )
}
export default Cart;