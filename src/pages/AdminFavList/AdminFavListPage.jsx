import { useState } from "react";
import { useQuery } from "react-query";
import Training from "../../components/Training/Training.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";

const AdminFavListPage = () => {
  const { hookGetFetch } = useFetchHooks();
  const [allFavs, setAllFavs] = useState([]);

  const { isLoading, data, isError, isSuccess, error } = useQuery(
    ["favList", "fav"],
    () => hookGetFetch("fav"),
    {
      onSuccess: (data) => {
        setAllFavs(data);
      },
    }
  );

  return (
    <>
      <div className="training-list-fav">
        <h1>Entranamientos Favoritos</h1>

        {isLoading ? <p>Loading.....</p> : null}
        {isError ? <p>{error}</p> : null}
        {isSuccess ? <Training data={allFavs} /> : null}
      </div>
    </>
  );
};

export default AdminFavListPage;
