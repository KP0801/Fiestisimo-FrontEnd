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
            </Route>
            <Route path="/InicioUsers" element={<RutaProtegidaUsuarios />}>
              <Route index element={<PaginaInicioUsuarios />} />
              <Route path="productos/:categoria" element={<ProdCategory />} />
              <Route path="productos/:categoria/:id" element={<ProductoId />} />
              <Route path="search" element={<ResultsSearch />} />
            </Route>
          </Routes>
        </AuthProviderUsers>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
