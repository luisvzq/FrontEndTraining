import { useContext } from "react";
import { authContext } from "../../context/AuthContext";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Users = ({ data }) => {
  const [context] = useContext(authContext);

  return (
    <ul className="list-training">
      {data.map((user) => {
        return (
          <li key={user.id} className="training-element">
            <h2>{user.name}</h2>
          </li>
        );
      })}
    </ul>
  );
};

Users.propTypes = {
  data: PropTypes.array,
};

export default Users;
