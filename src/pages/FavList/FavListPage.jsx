import { useState } from "react";
import Training from "../../components/Training/Training.jsx";
import "./FavListPage.scss";
import Loading from "../../components/Loading/Loading.jsx";
import useFetchHooks from "../../hooks/useFetchHooks.js";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

const FavListPage = () => {
  const [allFavs, setAllFavs] = useState([]);

  const { hookGetFetch } = useFetchHooks();

  const { isLoading, isError, isSuccess, error, refetch } = useQuery(
    ["favList", "fav"],
    () => hookGetFetch("fav"),
    {
      onSuccess: (data) => {
        setAllFavs(data);
      },
    }
  );

  const renderizar = () => {
    refetch();
  };

  return (
    <>
      <div className="training-list-fav">
        <h2>Entranamientos Favoritos</h2>
        {isLoading ? <Loading /> : null}

        {isError ? <p>{error}</p> : null}
        {isSuccess ? <Training data={allFavs} renderizar={renderizar} /> : null}
      </div>
    </>
  );
};
FavListPage.propTypes = {
  data: PropTypes.array,
  renderizar: PropTypes.func,
};

export default FavListPage;
