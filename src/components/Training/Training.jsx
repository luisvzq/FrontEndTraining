import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Training.scss";

const Training = ({ data }) => {
  const [context] = useContext(authContext);

  return (
    <ul className="listTraining">
      {data.map((training) => {
        return (
          <li key={training.id}>
            <Link
              to={
                context.role === "admin"
                  ? `/admin/entreno/${training.id}`
                  : `/entreno/${training.id}`
              }
            >
              <h2>{training.name}</h2>

              <img
                src={`${import.meta.env.VITE_HOST_BACK}:${
                  import.meta.env.VITE_PORT_BACK
                }/${training.photo}`}
                alt="Imagen del entreno seleccionado"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

Training.propTypes = {
  data: PropTypes.array,
};

export default Training;
