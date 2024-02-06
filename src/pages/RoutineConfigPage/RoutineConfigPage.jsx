import { useState } from "react";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import "./RoutineConfigPage.scss";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";
import RoutineList from "../../components/RoutineList/RoutineList";

const RoutineConfigPage = () => {
  const { id } = useParams();

  const { hookGetFetch, hookPostPatchFetch } = useFetchHooks();

  const [routines, setRoutines] = useState([]);
  const [selectTraining, setSelectTraining] = useState([]);
  const [trainingRoutine, setTrainingRoutine] = useState([]);

  const mutation = useMutation(hookPostPatchFetch);
  // const postBody = { idTraining: parseInt(entrenamientos), reps: 2, series: 8 };

  const getTraining = useQuery(
    [`training`, "training"],
    () => hookGetFetch(`training`),
    {
      onSuccess: (data) => {
        setSelectTraining(data);
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


  const listRoutine = useQuery(
    [`getTrainingRoutine/${id}`, `getTrainingRoutine/${id}`],
    () => hookGetFetch(`getTrainingRoutine/${id}`),
    {
      onSuccess: (data) => {
        setTrainingRoutine(data);
      },
    }
  );
  const renderizar=()=>{
    listRoutine.refetch();
  }

  const handleChangeSelect = async (e) => {
    const postBody = { idTraining: e.target.value, reps: 2, series: 8 };

    mutation.mutate(
      {
        endpoint: `addTrainingToRoutine/${id}`,
        method: "POST",
        user: postBody,
      },
      {
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
          });
        },

        onSuccess: (data) => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: "rounded-popup",
            },
          });
          listRoutine.refetch();
        },
      }
    );
    // listRoutine.refetch();
  };

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
        <select onChange={handleChangeSelect}>
          {/* Opción por defecto */}
          <option defaultValue="">Selecciona un entrenamiento</option>
          {/* Mapear los entrenamientos en opciones del select */}
          {selectTraining.map((entrenamiento) => {
            return (
              <option key={entrenamiento.id} value={entrenamiento.id}>
                {entrenamiento.name}
              </option>
            );
          })}
        </select>
      )}
      <RoutineList trainingRoutine={trainingRoutine} renderizar={renderizar}/>
    </>
  );
};

export default RoutineConfigPage;
