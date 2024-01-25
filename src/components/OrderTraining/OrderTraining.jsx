import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { authContext } from "../../context/AuthContext";

import "./OrderTraining.scss";

const OrderAndSearchInputTraining = ({ setAllTraining }) => {
  const [context] = useContext(authContext);

  const [searchParams, setSearchParams] = useState({
    name: "",
    typology: "",
    muscle_group: "",
    order_by: "",
  });

  const handleChange = (field, value) => {
    setSearchParams({
      ...searchParams,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getTrainingFetch();
  };

  const getTrainingFetch = async () => {
    try {
      const queryParams = new URLSearchParams(searchParams).toString();
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
    const queryParams = new URLSearchParams(searchParams).toString();
    const search = queryParams ? `?${queryParams}` : "";
    window.history.replaceState({}, "", `${window.location.pathname}${search}`);
    getTrainingFetch();
  }, [searchParams]);

  return (
    <form className="order-training-form" onSubmit={handleSubmit}>
      <div className="search-group">
        <label htmlFor="typology">Tipologia</label>
        <input
          type="text"
          id="typology"
          value={searchParams.typology}
          onChange={(e) => handleChange("typology", e.target.value)}
        />
      </div>
      <div className="search-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={searchParams.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="search-group">
        <label htmlFor="muscleGroup">Grupo Muscular</label>
        <input
          type="text"
          id="muscleGroup"
          value={searchParams.muscleGroup}
          onChange={(e) => handleChange("muscle_group", e.target.value)}
        />
      </div>
      <div className="order-group">
        <label htmlFor="order"></label>
        <select
          value={searchParams.order}
          name="order"
          id="order"
          onChange={(e) => {
            handleChange("order_by", e.target.value);
          }}
        >
          <option value="">Ordenar por</option>
          <option value="name">Nombre</option>
          <option value="date">Fecha</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      <button type="submit">Buscar</button>
    </form>
  );
};

OrderAndSearchInputTraining.propTypes = {
  setAllTraining: PropTypes.func,
};

export default OrderAndSearchInputTraining;
