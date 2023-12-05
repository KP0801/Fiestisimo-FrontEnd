import { Link } from "react-router-dom";
import useAuthUsers from "../hooks/useAuthUsers";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdCardTravel } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { FaCalendarTimes } from "react-icons/fa";

const SideBarUusuarios = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authUsers } = useAuthUsers();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      {location.pathname === "/InicioUsers" ? (
        <>
          <div className="flex justify-center mt-5">
            <p className="text-base text-sky-700 font-bold uppercase">
              <span className="text-lg text-sky-700 font-black">
                Bienvenido :
              </span>{" "}
              {authUsers.name}
            </p>
          </div>
        </>
      ) : (
        <p
          onClick={() => navigate(-1)}
          className="mb-5 px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white flex justify-center cursor-pointer rounded-lg shadow-md"
        >
          <IoMdArrowBack size={25} />
        </p>
      )}
      <Link
        to="reservaciones"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase text-sm font-bold flex items-center justify-around mt-10 rounded-lg py-2 ${
          location.pathname === "/InicioUsers/reservaciones" ? "bg-sky-100" : ""
        }`}
      >
        Reservaciones
        <MdCardTravel size={25} />
      </Link>
      <Link
        to="reservacionesCancel"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase text-sm font-bold flex items-center justify-around mt-10 rounded-lg py-2 ${
          location.pathname === "/InicioUsers/reservacionesCancel"
            ? "bg-sky-100"
            : ""
        }`}
      >
        Reservaciones Canceladas
        <FcCancel size={25} />
      </Link>
      <Link
        to="reservacionesFin"
        className={`w-4/5 text-blue-800 border border-sky-400 uppercase text-sm font-bold flex items-center justify-around mt-10 rounded-lg py-2 ${
          location.pathname === "/InicioUsers/reservacionesFin"
            ? "bg-sky-100"
            : ""
        }`}
      >
        Reservaciones Finalizadas
        <FaCalendarTimes size={25} />
      </Link>
    </aside>
  );
};

export default SideBarUusuarios;
