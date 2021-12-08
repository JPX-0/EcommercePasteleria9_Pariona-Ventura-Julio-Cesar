import Item from "./Item";
import OpenDetail from "../buttons/OpenDetail";
import { memo } from "react";

// ItemList -- se renderiza la lista de productos esperada.
const ItemList = (props) => {
  return (
    <>
      {
        // se comprueba si la data llega o no.
        props.content ?
          // se espera a que la data termine de cargar.
          props.content.length > 0 ?
          <section className="main__container">
            {
              // se mapea la lista recibida.
              props.content.map(art => 
                <figure key={`figure${art.id}`} className="card">
                  <h2 className="card__title responsive-M--Block">{art.title}</h2>
                  <Item src={art.pictureURL} alt={art.title}/>
                  <article className="card__detail">
                    <h2 className="card__title responsive-D--Block">{art.title}</h2>
                    <OpenDetail href={art.id}/>
                  </article>
                </figure>
              ) 
            }
          </section> :
          <p className="msg msg__cargando"></p> :
        <p className="msg__error"></p>
      }
    </>
  )}
export default memo(ItemList);