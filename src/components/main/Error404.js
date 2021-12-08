import e404 from "../../assets/error404.webp"

// Error404 -- se renderiza una pagina de error.
const Error404 = () => {
  return (
    <section className="error__figure">
      <p className="main__title">¡Ups! Página no encontrada</p>
      <img src={e404} alt="Error, página no encontrada" className="error__img" />
    </section>
  )
}
export default Error404;