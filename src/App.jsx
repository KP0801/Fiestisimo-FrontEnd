import { BrowserRouter, Routes, Route } from "react-router-dom";
import Description from "./Components/Description";
import Login from "./pages/Login&Registro/Login";
import RecoverPassword from "./pages/Login&Registro/RecoverPassword";
import Register from "./pages/Login&Registro/Register";
import AuthLayouts from "./layouts/AuthLayouts";
import RutaProtegida from "./layouts/RutaProtegida";
import PaginaInicio from "./pages/PaginaInicio";
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegidaUsuarios from "./layouts/RutaProtegidaUsuarios";
import PaginaInicioUsuarios from "./pages/ProfilesUsers/PaginaInicioUsuarios";
import { AuthProviderUsers } from "./context/AuthProviderUsers";
import NuevoProducto from "./Components/Productos/NuevoProducto";
import AddUsuario from "./Components/RolUsuarios/AddUsuario";
import ProdCategory from "./Components/Productos/ProdCategory";
import ProductoId from "./Components/Productos/ProductoId";
import ProductosView from "./pages/ProductosView";
import DesactiveUsers from "./Components/RolUsuarios/DesactiveUsers";
import ResultsSearch from "./Components/RolUsuarios/ResultsSearch";
import ReservacionesUser from "./Components/RolUsuarios/ReservacionesUser";
import ReservacionesCancel from "./Components/RolUsuarios/ReservacionesCancel";
import Reservaciones from "./Components/Administrador/Reservaciones";
import ReservacionesFin from "./Components/RolUsuarios/ReservacionesFin";
import ProdFav from "./Components/RolUsuarios/ProdFav";
import ProdCardSearch from "./Components/Productos/ProdCardSearch";
import ProdSearchId from "./Components/Productos/ProdSearchId";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthProviderUsers>
          <Routes>
            <Route path="/" element={<AuthLayouts />} />
            <Route path="quienes-somos" element={<Description />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="recover-password" element={<RecoverPassword />} />
            <Route path="/InicioAdm" element={<RutaProtegida />}>
              <Route index element={<PaginaInicio />} />
              <Route path="productosAdmin" element={<ProductosView />} />
              <Route path="AddProducts" element={<NuevoProducto />} />
              <Route path="AddUsuario" element={<AddUsuario />} />
              <Route path="DesactiveUsuario" element={<DesactiveUsers />} />
              <Route path="resAdmin" element={<Reservaciones />} />
            </Route>
            <Route path="/InicioUsers" element={<RutaProtegidaUsuarios />}>
              <Route index element={<PaginaInicioUsuarios />} />
              <Route path="productos/:categoria" element={<ProdCategory />} />
              <Route path="productos/:categoria/:id" element={<ProductoId />} />
              <Route path="search" element={<ResultsSearch />} />
              <Route
                path="search/productos/:categoria"
                element={<ProdCardSearch />}
              />
              <Route
                path="search/productos/:categoria/:id"
                element={<ProdSearchId />}
              />
              <Route path="reservaciones" element={<ReservacionesUser />} />
              <Route
                path="reservacionesCancel"
                element={<ReservacionesCancel />}
              />
              <Route path="reservacionesFin" element={<ReservacionesFin />} />
              <Route path="Favoritos" element={<ProdFav />} />
            </Route>
          </Routes>
        </AuthProviderUsers>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
