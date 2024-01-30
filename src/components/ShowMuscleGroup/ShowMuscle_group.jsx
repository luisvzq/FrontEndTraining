import { useState } from "react";
import { useParams } from "react-router-dom";
import Training from "../Training/Training";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

const ShowMuscle_group = () => {
  const [result, setResult] = useState([]);
  const { muscle_group } = useParams();
  const { hookGetFetch } = useFetchHooks();
  const { isLoading, isError, isSuccess, error } = useQuery(
    ["muscle_group", `training?muscle_group=${muscle_group}`],
    () => hookGetFetch(`training?muscle_group=${muscle_group}`),
    {
      onSuccess: (data) => {
        setResult(data);
      },
    }
  );

  return (
    <div className="training-list">
      <h1>Entrenamientos de grupo muscular: {muscle_group}</h1>
      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? <Training data={result} /> : null}
    </div>
  );
};

export default ShowMuscle_group;
