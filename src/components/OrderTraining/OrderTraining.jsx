import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";
import { authContext } from "../../context/AuthContext";
import "./OrderTraining.scss";

const OrderAndSearchInputTraining = ({ setAllTraining }) => {
  const [context] = useContext(authContext);

  const [name, setName] = useState("");
  const [typology, setTypology] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [order, setOrder] = useState("name");

  let nameOk;
  let typologyOk;
  let muscleGroupOk;

  if (name) {
    nameOk = `name=${name}`;
  }
  if (typology) {
    typologyOk = `typology=${typology}`;
  }
  if (muscleGroup) {
    muscleGroupOk = `muscle_group=${muscleGroup}`;
  }

  const getTrainingFetch = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/training?${nameOk}&${typologyOk}&${muscleGroupOk}&order_by=${order}`,
        {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }

      const body = await res.json();
      console.log(body.data);

      setAllTraining(body.data);
    } catch (error) {
      console.error("Error:", error.menssage);
    }
  };
  const handleChange = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "typology":
        setTypology(value);
        break;
      case "muscleGroup":
        setMuscleGroup(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getTrainingFetch();
  };
  let search = "";
  useEffect(() => {
    // Actualiza la URL con las consultas de búsqueda

    const queryParams = new URLSearchParams();
    if (name) queryParams.set("name", name);
    if (typology) queryParams.set("typology", typology);
    if (muscleGroup) queryParams.set("muscle_group", muscleGroup);
    if (typology) {
      search = "?";
    }
    if (name) {
      search = "?";
    }
    if (muscleGroup) {
      search = "?";
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${search}${queryParams.toString()}`
    );
  }, [name, typology, muscleGroup, search]);

  return (
    <form className="order-training-form" onSubmit={handleSubmit}>
      <div className="search-group">
        <label htmlFor="typology">Tipologia</label>
        <input
          type="text"
          id="typology"
          value={typology}
          onChange={(e) => handleChange("typology", e.target.value)}
        />
      </div>
      <div className="search-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="search-group">
        <label htmlFor="muscleGroup">Grupo Muscular</label>
        <input
          type="text"
          id="muscleGroup"
          value={muscleGroup}
          onChange={(e) => handleChange("muscleGroup", e.target.value)}
        />
      </div>
      <div className="order-group">
        <label htmlFor="order"></label>
        <select
          value=""
          name="order"
          id="order"
          onChange={(e) => {
            e.preventDefault();
            setOrder(e.target.value);
            getTrainingFetch(`Bearer ${context.token}`, setAllTraining);
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
  setAllTraining: PropTypes.object,
};
export default OrderAndSearchInputTraining;
