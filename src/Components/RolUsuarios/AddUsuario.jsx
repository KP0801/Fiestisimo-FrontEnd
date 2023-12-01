import { useState, useEffect } from "react";
import axios from "axios";
import TableUsers from "./TableUsers";
const AddUsuario = () => {
  const [users, setUsers] = useState([]);
  const [check, setCheck] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const indexOfLastuser = currentPage * usersPerPage;
  const indexOfFirstuser = indexOfLastuser - usersPerPage;
  const currentUser = users.slice(indexOfFirstuser, indexOfLastuser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/fiestisimo/managementUser`,
          config
        );
        console.log("USUARIOS", data.users);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [check]);
  return (
    <>
      <div className="container mx-auto p-3">
        <div className="mt-5 text-center mb-6">
          <p className="text-sky-800 font-black text-3xl uppercase">
            Usuarios Fiestisimo
          </p>
        </div>
        <TableUsers
          currentUser={currentUser}
          check={check}
          setCheck={setCheck}
        />
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

export default AddUsuario;
