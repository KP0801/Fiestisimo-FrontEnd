import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authAdm, setAuthAdm] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarAdmnin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/login/`,
          config
        );
        console.log("DATOS USUARIO", data);
        setAuthAdm(data);
        navigate("/InicioAdm");
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    autenticarAdmnin();
  }, [authAdm.role === "admin"]);

  const cerrarSesion = () => {
    setAuthAdm({});
  };

  return (
    <AuthContext.Provider
      value={{
        setAuthAdm,
        authAdm,
        cargando,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
