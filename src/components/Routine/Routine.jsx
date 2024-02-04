import PropTypes from "prop-types";
import "./Routine.scss";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

const Routine = ({ data }) => {
  const [context] = useContext(authContext);

  let route = "";
  if (context.role === "admin") {
    route = "/admin/configurar-rutina/";
  } else {
    route = "/configurar-rutina/";
  }

  console.log("data is", data);
  return (
    <ul className="routine-list">
      {data.map((routine) => {
        return (
          <li key={routine.id}>
            <Link to={`${route}${routine.id}`}>
              <h2>{routine.name}</h2>

              <p>{routine.description}</p>
            </Link>
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
