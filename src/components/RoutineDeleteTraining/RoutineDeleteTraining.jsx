import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import Delete from "../../assets/Delete.svg";
import PropTypes from "prop-types";

const RoutineDeleteTraining = ({ trainingRoutineId, renderizar }) => {
  const [context] = useContext(authContext);

  const confirmation = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Esta seguro?",
      text: "El entreno se borrara de la rutina !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminarlo.",
    }).then((result) => {
      if (result.value) {
        handleButton();
      }
    });
  };

  const handleButton = () => { 

    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/deleteTrainingRoutine/${trainingRoutineId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
    
          const bodyButtonDel = await response.json();
          console.log("Respuesta a Button Delete", bodyButtonDel);
          renderizar();
        } else {
          const body = await response.json();
          console.error("ERROR fetchButton", body.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchButton();
  };

  return (
    <>
      <button className="buttons-delete" onClick={confirmation}>
        {" "}
        <img src={Delete} alt="Eliminar entreno de rutina" className="delete" />
      </button>
    </>
  );
};

RoutineDeleteTraining.propTypes = {
  trainingRoutineId: PropTypes.number,
  renderizar: PropTypes.func,
};

export default RoutineDeleteTraining;