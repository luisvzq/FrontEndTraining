import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useState } from "react";
import Routine from "../../components/Routine/Routine";
import Loading from "../../components/Loading/Loading";

const RoutinePage = () => {
  const [allRoutines, setAllRoutines] = useState([]);
  const { hookGetFetch } = useFetchHooks();
  const { isLoading, isError, error, isSuccess } = useQuery(
    ["routineInfo", "getRoutine"],
    () => hookGetFetch("getRoutine"),
    {
      onSuccess: (data) => {
        setAllRoutines(data);
      },
    }
  );

  return (
    <>
      <p>Pagina de Rutinas</p>
      <Link to="/crear-rutinas">Añadir Rutinas</Link>
      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? <Routine data={allRoutines} /> : null}
    </>
  );
};

export default RoutinePage;
