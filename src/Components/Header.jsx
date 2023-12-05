import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "../design/Logo1.png";

const Header = () => {
  const { cerrarSesion } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesion();
    localStorage.removeItem("token");
  };
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <Link to="/InicioAdm">
          <img src={Logo} alt="LogoFiestisimo" className="w-32 h-auto" />
        </Link>
        {/* <input type='search' className="rounded-lg lg:w-96 block p-2 border" placeholder="Buscar Proyectos..."/> */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleCerrarSesion}
            type="button"
            className="text-white text-sm bg-sky-600 uppercase shadow-md hover:bg-sky-800 p-3 rounded-md font-bold"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
