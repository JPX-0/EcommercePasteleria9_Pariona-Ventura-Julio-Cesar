import { useEffect } from "react";

// Hamburguer -- se renderiza el boton responsivo.
const Hamburguer = () => {
  useEffect(() => {
    const btnHamburguer = document.querySelector(`.btn__hamburguer`);
    const menuMobile = document.querySelector(`.header__menu`);
    btnHamburguer.addEventListener(`click`, () => {
      btnHamburguer.classList.toggle(`btn__hamburguer--active`);
      menuMobile.classList.toggle(`header__menu--active`);
    })
    window.addEventListener(`resize`, () => {
      if(window.innerWidth > 767) {
        btnHamburguer.classList.remove(`btn__hamburguer--active`);
        menuMobile.classList.remove(`header__menu--active`);
      }
    })
  },[])
  return (
    <>
      <button className="btn btn__hamburguer"><span></span></button>
    </>
  )};
export default Hamburguer;