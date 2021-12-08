import CartWidget from "./CartWidget"
import Hamburguer from "./Hamburguer";
import NavWidget from "./NavWidget";

// NavBar -- renderiza el logo, navs, el boton de carrito y el boton hamburguesa.
const NavBar = () => {
  return (
    <nav className="header__container">
      <NavWidget title="Pasteleria Yuumy" type="Logo"/>
      <ul className="header__menu">
        <NavWidget title="Inicio"/>
        <NavWidget title="Tienda"/>
        <NavWidget title="Ofertas"/>
        <li className="header__list header__list--dropdown">
          <p className="header__title">Categorias</p>
          <ol className="header__category">
            <NavWidget title="Buttercream" type="category"/>
            <NavWidget title="Chocolate" type="category"/>
            <NavWidget title="Tres Leches" type="category"/>
            <NavWidget title="Frutas" type="category"/>
          </ol>
        </li>
        <CartWidget/>
      </ul>
      <Hamburguer/>
    </nav>
  )};
export default NavBar;