import "./Details.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import FavChecked from "../ButtonsLikeFav/FavChecked";
import CountLikeChecked from "../ButtonsLikeFav/CountLikeChecked";
import { Link } from "react-router-dom";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

const Details = ({ trainingId }) => {
  const [details, setDetails] = useState({});

  const { hookGetFetch } = useFetchHooks();
  const { isLoading, isSuccess } = useQuery(
    [`details${trainingId}`, `training/${trainingId}`],
    () => hookGetFetch(`training/${trainingId}`),
    {
      onSuccess: (data) => {
        setDetails(data);
      },
    }
  );

  return (
    <div className="container-detail">
      {isLoading ? <Loading /> : null}
      {isSuccess
        ? details.name && (
            <>
              <h1 className="title">{details.name}</h1>
              <div className="details">
                <div className="photo-container">
                  <img
                    className="photo"
                    src={`${import.meta.env.VITE_HOST_BACK}:${
                      import.meta.env.VITE_PORT_BACK
                    }/${details.photo}`}
                    alt="Foto de entreno"
                  />
                </div>{" "}
                <div className="interact-container">
                  <div className="tags">
                    <Link to={`/admin/entrenos?typology=${details.typology}`}>
                      <button className="tag">
                        Tipologia: {details.typology}
                      </button>
                    </Link>
                    <Link to={`/admin/entrenos?muscle_group=${details.muscle_group}`}>
                      <button className="tag">
                        Grupo muscular: {details.muscle_group}
                      </button>
                    </Link>
                  </div>
                  <div className="logos">
                    <FavChecked trainingId={trainingId} />
                    <CountLikeChecked trainingId={trainingId} />
                  </div>
                </div>
                <div className="description-container">
                  <p className="description">{details.description}</p>
                </div>
              </div>
            </>
          )
        : null}
    </div>
  );
};

Details.propTypes = {
  trainingId: PropTypes.string,
};

export default Details;
