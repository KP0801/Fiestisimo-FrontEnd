import { Link } from "react-router-dom";
import useAuthUsers from "../hooks/useAuthUsers";
import Logo from "../design/Logo1.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeaderUsers = () => {
  const { cerrarSesionUsers } = useAuthUsers();
  const [valueSearch, setValueSearch] = useState("");

  const handleCerrarSesion = () => {
    cerrarSesionUsers();
    localStorage.removeItem("token");
  };

  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (valueSearch.trim() === "") {
      navigate("/InicioUsers");
    } else {
      navigate("search", {
        state: valueSearch,
      });
      setValueSearch("");
    }
  };

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <Link to="">
            <img src={Logo} alt="LogoFiestisimo" className="w-32 h-auto" />
          </Link>
        </div>
        <form
          onSubmit={onSearchSubmit}
          className="col-span-1 flex items-center relative"
        >
          <input
            type="text"
            name="valueSearch"
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
            placeholder="Buscar Productos ..."
            className="border border-gray-300 p-2 pl-8 rounded-md w-full outline-none focus:border-sky-600 focus:border-spacing-2"
          />
          <button type="submit" className="absolute right-4 text-gray-400">
            <FaSearch className="mr-2 text-xl" />
          </button>
        </form>
        <div className="grid grid-cols-2 justify-around items-center">
          <div className="col-span-1 flex justify-end">
            <Link to="/pedidos" className="font-bold uppercase">
              Favoritos
            </Link>
          </div>
          <div className="col-span-1 flex justify-end">
            <button
              onClick={handleCerrarSesion}
              type="button"
              className="text-white text-sm bg-sky-600 uppercase shadow-md hover:bg-sky-800 p-3 rounded-md font-bold"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderUsers;
