import { useState } from "react";
import { useParams } from "react-router-dom";
import Training from "../Training/Training";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";



const ShowMuscle_group = () => {

  const[result, setResult]= useState([])
    const {muscle_group} = useParams();
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
<>
        {isLoading ? <p>Loading.....</p> : null}
        {isError ? <p>{error}</p> : null}
        {isSuccess ? <Training data={result} /> : null}
</>
  )
};



export default ShowMuscle_group;
