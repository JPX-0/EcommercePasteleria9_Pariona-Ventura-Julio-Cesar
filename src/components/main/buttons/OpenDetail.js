import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

// OpenDetail -- se renderiza el boton para ver los detalles.
const OpenDetail = (props) => {
  return (
    <>
      <Link to={`/item/${props.href}`} className="btn btn__showDetail"><i><AiOutlineSearch/></i>Ver Detalles</Link>
    </>
  )};
export default OpenDetail;