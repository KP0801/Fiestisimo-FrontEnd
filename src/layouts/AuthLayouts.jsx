import Navbar from "../Components/Navbar";
import PrincipalPage from "../pages/PrincipalPage";

const AuthLayouts = () => {
  return (
    <>
      <main className="px-3 lg:px-10">
        <Navbar />
        <hr />
        <div className="container mx-10 mt-32">
          <PrincipalPage />
        </div>
      </main>
    </>
  );
};

export default AuthLayouts;
