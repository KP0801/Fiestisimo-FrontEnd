import axios from "axios";
import { useState, useEffect } from "react";
const DesactiveUsers = () => {
  const [desactives, setDesactives] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const indexOfLastuser = currentPage * usersPerPage;
  const indexOfFirstuser = indexOfLastuser - usersPerPage;
  const currentUser = desactives.slice(indexOfFirstuser, indexOfLastuser);

  const totalPages = Math.ceil(desactives.length / usersPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getDesactive = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/fiestisimo/managementUser/inactiveUsers`,
          config
        );
        console.log(data);
        setDesactives(data.inactiveUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getDesactive();
  }, []);
  return (
    <>
      <div className="mt-5 mb-5 text-center">
        <p className="text-sky-800 text-3xl font-bold uppercase">
          Usuarios Desactivados
        </p>
      </div>
      <div className="flex justify-center">
        {currentUser.length > 0 ? (
          <div className="w-full">
            <table className="w-full bg-white shadow-md table-auto">
              <thead className="bg-red-800 text-white">
                <tr>
                  <th className="py-3 px-6">Nombre</th>
                  <th className="py-3 px-6">Correo</th>
                  <th className="py-3 px-6">Telefono</th>
                </tr>
              </thead>
              <tbody>
                {currentUser.map((user) => (
                  <tr className="border-b" key={user.id_user}>
                    <td className="border px-6 py-4 text-sm font-semibold">
                      {user.name}
                    </td>
                    <td className="border px-6 py-4 text-sm font-semibold">
                      {user.email}
                    </td>
                    <td className="border px-6 py-4 text-sm font-semibold">
                      {user.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-800 text-4xl font-bold">
            No hay usuarios desactivados
          </p>
        )}
      </div>
      <div className="flex flex-col mt-10">
        {/* ... */}
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-2 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesactiveUsers;
