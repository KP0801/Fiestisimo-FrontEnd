import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContextUsers = createContext();

const AuthProviderUsers = ({ children }) => {
  const [authUsers, setAuthUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [productosUser, setProductosUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
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
        setAuthUsers(data);
        navigate("/InicioUsers");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    autenticarUsers();
  }, [authUsers.role === "cliente"]);

  const cerrarSesionUsers = () => {
    setAuthUsers({});
  };

  useEffect(() => {
    const getProductos = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/products/all/products`
        );
        console.log("PRODUCTOS DESDE EL PROVIDER DE USUARIOS", data.products);
        setProductosUser(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getProductos();
  }, []);

  return (
    <AuthContextUsers.Provider
      value={{
        authUsers,
        setAuthUsers,
        loading,
        cerrarSesionUsers,
        productosUser,
      }}
    >
      {children}
    </AuthContextUsers.Provider>
  );
};

export { AuthProviderUsers };

export default AuthContextUsers;
