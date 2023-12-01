import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../Components/Spinner";

const RutaProtegida = () => {
  const { authAdm, cargando } = useAuth();
  if (cargando) return <Spinner />;
  return (
    <>
      {authAdm.role === "admin" ? (
        <div className="bg-white">
          <Header />
          <div className="md:flex md:min-h-screen">
            <SideBar />

            <main className="flex-1 p-10 h-screen">
              {/* flex-1 hace que tome el resto del contenido de la pantalla */}
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default RutaProtegida;
