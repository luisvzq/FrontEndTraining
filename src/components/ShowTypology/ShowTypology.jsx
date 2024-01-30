import { useState } from "react";
import { useParams } from "react-router-dom";
import Training from "../Training/Training";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

const ShowTypology = () => {
  const [result, setResult] = useState([]);
  const { typology } = useParams();
  const { hookGetFetch } = useFetchHooks();
  const { isLoading, isError, isSuccess, error } = useQuery(
    ["typology", `training/typology=${typology}`],
    () => hookGetFetch(`training?typology=${typology}`),
    {
      onSuccess: (data) => {
        setResult(data);
      },
    }
  );

  console.log(result);

  return (
    <div className="training-list">
      <h1>Entrenamientos de tipologia: {typology}</h1>
      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? <Training data={result} /> : null}
    </div>
  );
};

export default ShowTypology;
