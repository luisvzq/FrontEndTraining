import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import useFetchHooks from "../../hooks/useFetchHooks";
import Loading from "../../components/Loading/Loading";
import "./ButtonsLikeFav.scss";
import { useQuery } from "react-query";

const FavChecked = ({ trainingId }) => {
  const [context] = useContext(authContext);
  const [fav, setFav] = useState();
  const { hookGetFetch } = useFetchHooks();
  const { isLoading, isSuccess } = useQuery(
    [`favChecked/${trainingId}`, `favChecked/${trainingId}`],
    () => hookGetFetch(`favChecked/${trainingId}`),
    {
      onSuccess: (data) => {
        setFav(data.FavCheck);
      },
    }
  );

  const handleButton = (table, method) => {
    console.log(`Metodo: ${method} para la tabla: ${table}`);
    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/${table}/${trainingId}`,
          {
            method: method,
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const bodyButtonFav = await response.json();
          console.log("Respuesta a Button Favorite", bodyButtonFav);
          setFav(!fav);
        } else {
          const body = await response.json();
          console.error("ERROR fetchButton", body.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchButton();
  };

  return (
    <div className="fav-container">
      {isLoading ? <Loading /> : null}
      {isSuccess ? (
        <button
          className={`FAV ${fav && "red"}`}
          onClick={() => {
            handleButton("fav", fav ? "DELETE" : "POST");
          }}
        ></button>
      ) : null}
    </div>
  );
};

FavChecked.propTypes = {
  trainingId: PropTypes.string,
};

export default FavChecked;
