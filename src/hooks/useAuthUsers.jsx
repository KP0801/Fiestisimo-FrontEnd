import { useContext } from "react";
import AuthContextUsers from "../context/AuthProviderUsers";

const useAuthUsers = () => {
  return useContext(AuthContextUsers);
};

export default useAuthUsers;
