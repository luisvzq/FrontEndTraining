import PropTypes from "prop-types";
const Training = ({ data }) => {
  return (
    <ul>
      {data.map((training) => {
        return (
          <li key={training.id}>
            <p>{training.name}</p>
            <img
              src={`http://localhost:8000/${training.photo}`}
              alt="Imagen del entreno seleccionado"
            />
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
