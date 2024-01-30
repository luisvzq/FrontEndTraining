import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { authContext } from "../../context/AuthContext";

import "./OrderTraining.scss";

const OrderAndSearchInputTraining = ({ setAllTraining }) => {
  const [context] = useContext(authContext);
  const [name, setName] = useState("");
  const [typology, setTypology] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [order, setOrder] = useState("");

  const [debouncedSearchParams, setDebouncedSearchParams] = useState({});

  const getTrainingFetch = async () => {
    try {
      const queryParams = new URLSearchParams(debouncedSearchParams).toString();
      console.log(queryParams);
      const res = await fetch(`http://localhost:3001/training?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${context.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }

      const body = await res.json();
      setAllTraining(body.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      const newSearchParams = {};
      if (name !== "") newSearchParams.name = name;
      if (typology !== "") newSearchParams.typology = typology;
      if (muscleGroup !== "") newSearchParams.muscle_group = muscleGroup;
      if (order !== "") newSearchParams.order_by = order;

      setDebouncedSearchParams(newSearchParams);
    }, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, [name, typology, muscleGroup, order]);

  useEffect(() => {
    const queryParams = new URLSearchParams(debouncedSearchParams).toString();
    const search = queryParams ? `?${queryParams}` : "";
    window.history.replaceState({}, "", `${window.location.pathname}${search}`);
    getTrainingFetch();
  }, [debouncedSearchParams]);

  return (
    <form className="order-training-form">
      <div className="search-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="search-group">
        <label htmlFor="typology">Tipologia</label>
        <input
          type="text"
          id="typology"
          value={typology}
          onChange={(e) => setTypology(e.target.value)}
        />
      </div>

      <div className="search-group">
        <label htmlFor="muscleGroup">Grupo Muscular</label>
        <input
          type="text"
          id="muscleGroup"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
        />
      </div>
      <div className="order-group">
        <label htmlFor="order"></label>
        <select
          value={order}
          name="order"
          id="order"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option value="">Ordenar por</option>
          <option value="name">Nombre</option>
          <option value="date">Fecha</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      {/* <button type="submit">Buscar</button> */}
    </form>
  );
};

OrderAndSearchInputTraining.propTypes = {
  setAllTraining: PropTypes.func,
};

export default OrderAndSearchInputTraining;
