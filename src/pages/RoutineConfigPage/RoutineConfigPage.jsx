import { useState } from "react";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import "./RoutineConfigPage.scss";
import { useParams } from "react-router-dom";

const RoutineConfigPage = () => {
  const { id } = useParams();
  const { hookGetFetch } = useFetchHooks();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [entrenamientoSeleccionado, setEntrenamientoSeleccionado] =
    useState("");
  const getTraining = useQuery(
    [`training`, "training"],
    () => hookGetFetch(`training`),
    {
      onSuccess: (data) => {
        setEntrenamientos(data);
      },
    }
  );

  const getRoutine = useQuery(
    [`routine${id}`, `/getRoutine/${id}`],
    () => hookGetFetch(`/getRoutine/${id}`),
    {
      onSuccess: (data) => {
        setRoutines(data);
      },
    }
  );
  console.log("🚀 ~ RoutineConfigPage ~ routines:", routines);

  return (
    <>
      <h1>Rutina: {routines.name}</h1>

      <select value={entrenamientoSeleccionado}>
        {/* Opción por defecto */}
        <option value="">Selecciona un entrenamiento</option>
        {/* Mapear los entrenamientos en opciones del select */}
        {entrenamientos.map((entrenamiento) => (
          <option key={entrenamiento.id} value={entrenamiento.name}>
            {entrenamiento.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default RoutineConfigPage;
