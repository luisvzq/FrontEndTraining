import PropTypes from "prop-types";
import "./Routine.scss";
import { Link } from "react-router-dom";
import RoutineConfigPage from "../../pages/RoutineConfigPage/RoutineConfigPage";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

const Routine = ({ data }) => {
  const [context] = useContext(authContext);
  return (
    <ul className="routine-list">
      {data.map((routine) => {
        return (
          <li key={routine.id}>
            {context.role === "admin" ? (
              <Link to={`/admin/configurar-rutina/${routine.id}`}>
                <RoutineConfigPage data={routine} />
              </Link>
            ) : (
              <Link to={`/configurar-rutina/${routine.id}`}>
                <RoutineConfigPage data={routine} />
              </Link>
            )}
            <h2 className="routine-name">{routine.name}</h2>
          </li>
        );
      })}
    </ul>
  );
};

Routine.propTypes = {
  data: PropTypes.array,
};

export default Routine;
