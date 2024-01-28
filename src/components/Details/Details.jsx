import "./Details.scss";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import PropTypes from "prop-types";
import FavChecked from "../ButtonsLikeFav/FavChecked";
import CountLikeChecked from "../ButtonsLikeFav/CountLikeChecked";
import { Link } from "react-router-dom";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

const Details = ({ trainingId }) => {
  const [context] = useContext(authContext);
  const [details, setDetails] = useState({});

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_HOST_BACK}:${
  //           import.meta.env.VITE_PORT_BACK
  //         }/training/${trainingId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${context.token}`,
  //           },
  //         }
  //       );

  //       if (response.ok) {
  //         const body = await response.json();
  //         console.log("respuesta entreno:", body.data);
  //         setDetails(body.data);
  //       } else {
  //         throw new Error("Error al hacer fetch al entreno ");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, [trainingId, context]);

  const { hookGetFetch } = useFetchHooks();

  // const { isLoading, data, isError, isSuccess, error } = useQuery(
    const { isLoading } = useQuery(
    [`details${trainingId}`,`training/${trainingId}`],
    () => hookGetFetch(`training/${trainingId}`),
    {
      onSuccess: (data) => {
        setDetails(data);
      },
    }
  );


  let route = "";
  if (context.role === "admin") {
    route = "/admin/entrenos?";
  } else {
    route = "/entrenos?";
  }

  return (
    <div className="container-detail">
        {isLoading ? (
        <Loading />
      ) : (
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
                <Link
                  to={`${route}name=&typology=${details.typology}&muscle_group=&order_by=`}
                >
                  <p className="tag">Tipologia: {details.typology}</p>
                </Link>
                <Link
                  to={`${route}name=&typology=&muscle_group=${details.muscle_group}&order_by=`}
                >
                  <p className="tag">Grupo muscular: {details.muscle_group}</p>
                </Link>
              </div>
              <div className="logos">
                <FavChecked trainingId={trainingId} />
                <CountLikeChecked trainingId={trainingId} />
              </div>
            </div>
            <div className="description-container">
              <p className="description">
                Descripción: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Corporis, blanditiis dolores eaque officiis cumque illo
                sunt adipisci commodi et quos quisquam temporibus repellendus
                rerum, iusto minus, error eveniet omnis quam. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Illum, mollitia ut.
                Accusamus ab repudiandae, tempore perferendis optio harum
                provident reiciendis, quidem, ipsum cum facere consequuntur? Sed
                aliquid exercitationem vitae magnam. {details.description}
              </p>
            </div>
          </div>
        </>
      )
      )}
    </div>
  );
};

Details.propTypes = {
  trainingId: PropTypes.string,
};

export default Details;
