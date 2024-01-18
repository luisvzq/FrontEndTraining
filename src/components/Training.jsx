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
                src={`http://localhost:3001/${training.photo}`}
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
