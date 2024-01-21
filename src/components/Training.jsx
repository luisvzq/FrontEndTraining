import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Training = ({ data }) => {
  return (
    <ul>
      {data.map((training) => {
        return (
          <li key={training.id}>
            <Link to={`/entreno/${training.id}`}>
              <p>{training.name}</p>

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
  data: PropTypes.object,
};

export default Training;
