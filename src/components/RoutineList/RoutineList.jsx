import PropTypes from "prop-types";

const RoutineList = ({ trainingRoutine }) => {
  return (
    <ul>
      {trainingRoutine.map((training) => {
        
        return (
          <li key={training.id_training}>
            <h2>{training.name}</h2>
            <p>{training.series}</p>
            <p>{training.reps}</p>
          </li>
        );
      })}
    </ul>
  );
};

RoutineList.propTypes = {
  trainingRoutine: PropTypes.array,
};
export default RoutineList;
