import "./Details.scss";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import FavChecked from "../ButtonsLikeFav/FavChecked";
import CountLikeChecked from "../ButtonsLikeFav/CountLikeChecked";
import { Link } from "react-router-dom";
import ButtonDelete from "../ButtonDelete/ButtonDelete"
//import Add from "../../assets/Add.svg"
import Edit from "../../assets/Edit.svg"
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { authContext } from "../../context/AuthContext";

const Details = ({ trainingId }) => {
  const [details, setDetails] = useState({});
  const [context]=useContext(authContext);

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
  let route="";
  if(context.role==="admin"){
    route="/admin/entrenos?";
  }else{
    route="/entrenos?";
  }
  return (
    <div className="container-detail">
      {context.role === "admin" &&<> 
        <div className="container-EMA">
            <ButtonDelete />
            <Link to={`/admin/modificar/${trainingId}`} >
            <button className="button"><img src={Edit} alt="Eliminar"className="edit"/></button>
            </Link> 
          </div></>}
      {isLoading ? <Loading /> : null}
      {isSuccess
        ? 
        
        details.name && (
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
                    <Link to={`${route}/admin/entrenos?typology=${details.typology}`}>
                      <button className="tag">
                        Tipologia: {details.typology}
                      </button>
                    </Link>
                    <Link to={`${route}/admin/entrenos?muscle_group=${details.muscle_group}`}>
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
