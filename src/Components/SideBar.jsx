import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { AiOutlineFileAdd, AiOutlineHome } from "react-icons/ai";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { FaUserXmark } from "react-icons/fa6";
import { MdCardTravel } from "react-icons/md";

const SideBar = () => {
  const { authAdm } = useAuth();
  const location = useLocation();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <Link
        to="/InicioAdm"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase font-bold flex items-center justify-around mt-5 rounded-lg py-2 ${
          location.pathname === "/InicioAdm" ? "bg-sky-100" : ""
        }`}
      >
        Inicio
        <AiOutlineHome size={25} />
      </Link>
      <Link
        to="productosAdmin"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase font-bold flex items-center justify-around mt-5 rounded-lg py-2 ${
          location.pathname === "/InicioAdm/productosAdmin" ? "bg-sky-100" : ""
        }`}
      >
        Productos
        <IoFastFood size={25} />
      </Link>
      <Link
        to="AddProducts"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase font-bold flex items-center justify-around mt-5 rounded-lg py-2 ${
          location.pathname === "/InicioAdm/AddProducts" ? "bg-sky-100" : ""
        }`}
      >
        Nuevo Producto
        <AiOutlineFileAdd size={25} />
      </Link>
      <Link
        to="AddUsuario"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase font-bold flex items-center justify-around mt-5 rounded-lg py-2 ${
          location.pathname === "/InicioAdm/AddUsuario" ? "bg-sky-100" : ""
        }`}
      >
        Usuarios
        <MdOutlineAssignmentInd size={25} />
      </Link>
      <Link
        to="DesactiveUsuario"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase font-bold flex items-center justify-around mt-5 rounded-lg py-2 ${
          location.pathname === "/InicioAdm/DesactiveUsuario"
            ? "bg-sky-100"
            : ""
        }`}
      >
        Desactivados
        <FaUserXmark size={25} />
      </Link>
      <Link
        to="resAdmin"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase font-bold flex items-center justify-around mt-5 rounded-lg py-2 ${
          location.pathname === "/InicioAdm/resAdmin" ? "bg-sky-100" : ""
        }`}
      >
        Reservaciones
        <MdCardTravel size={25} />
      </Link>
    </aside>
  );
};

export default SideBar;
