import { useState } from "react";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import "./RoutineConfigPage.scss";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const RoutineConfigPage = () => {
  const { id } = useParams();

  const { hookGetFetch } = useFetchHooks();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [entrenamientoSeleccionado] = useState("");

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
    [`routine${id}`, `getRoutine/${id}`],
    () => hookGetFetch(`getRoutine/${id}`),
    {
      onSuccess: (data) => {
        setRoutines(data);
      },
    }
  );

  return (
    <>
      {getRoutine.isLoading ? <Loading /> : null}
      {getRoutine.isLoading ? <Loading /> : null}
      {getRoutine.isError ? <p>{getRoutine.error}</p> : null}
      {getRoutine.isSuccess && (
        <>
          <h1>Rutina: {routines.name}</h1>
          <h3>Descripcion: {routines.description}</h3>
        </>
      )}

      {getTraining.isLoading ? <Loading /> : null}
      {getTraining.isError ? <p>{getTraining.error}</p> : null}
      {getTraining.isSuccess && (
        <select>
          {/* Opción por defecto */}
          <option defaultValue="">Selecciona un entrenamiento</option>
          {/* Mapear los entrenamientos en opciones del select */}
          {entrenamientos.map((entrenamiento) => (
            <option key={entrenamiento.id} value={entrenamiento.name}>
              {entrenamiento.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default RoutineConfigPage;
