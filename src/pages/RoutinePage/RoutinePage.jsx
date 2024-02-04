import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useState } from "react";
import Routine from "../../components/Routine/Routine";
import Loading from "../../components/Loading/Loading";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

const RoutinePage = () => {
  const [context] = useContext(authContext);
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

  let route = "";
  if (context.role === "admin") {
    route = "/admin/crear-rutinas";
  } else {
    route = "/crear-rutinas";
  }
  return (
    <>
      <p>Pagina de Rutinas</p>
      <Link to={`${route}`}>Añadir Rutinas</Link>
      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? <Routine data={allRoutines} /> : null}
    </>
  );
};

export default RoutinePage;
