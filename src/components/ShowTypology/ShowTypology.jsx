import { useState } from "react";
import { useParams } from "react-router-dom";
import Training from "../Training/Training";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";



const ShowTypology = () => {

  const[result, setResult]= useState([])
    const {typology} = useParams();
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
<>
        {isLoading ? <p>Loading.....</p> : null}
        {isError ? <p>{error}</p> : null}
        {isSuccess ? <Training data={result} /> : null}
</>
  )
};



export default ShowTypology;
