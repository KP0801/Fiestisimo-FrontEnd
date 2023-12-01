import Swal from "sweetalert2";
import { useEffect } from "react";

const Alerta = ({ alerta }) => {
  return useEffect(() => {
    alerta.error
      ? Swal.fire({
          position: "center",
          title: "Error",
          text: alerta.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        })
      : Swal.fire({
          position: "center",
          title: "Éxito",
          text: alerta.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
  }, [alerta]);
};

export default Alerta;
