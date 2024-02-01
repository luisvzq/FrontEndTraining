import { useState } from "react";
import { useQuery } from "react-query";

import useFetchHooks from "../../hooks/useFetchHooks.js";

import Loading from "../../components/Loading/Loading.jsx";
import Users from "../../components/Users/Users.jsx";

const UsersListPage = () => {
  const { hookGetFetch } = useFetchHooks();
  const [allUsers, setAllUsers] = useState([]);

  const { isLoading, data, isError, isSuccess, error } = useQuery(
    [`usersList`, `getAllUsers`],
    () => hookGetFetch(`getAllUsers`),
    {
      onSuccess: (data) => {
        setAllUsers(data);
      },
    }
  );

  return (
    <div className="training-list">
      <h1>Usuarios</h1>

      {isLoading ? <Loading /> : null}
      {isError ? <p>{error}</p> : null}
      {isSuccess ? <Users data={allUsers} /> : null}
    </div>
  );
};

export default UsersListPage;
