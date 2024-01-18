import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const OrderAndSearchInputTraining = ({ setAllTraining }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState("");
  const [typology, setTypology] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [order, setOrder] = useState("name");

  const tokenHardcoded =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sIjoibm9ybWFsIiwiaWF0IjoxNzA1NDI3MTMzLCJleHAiOjE3MDgwMTkxMzN9.0v2wqt3G2sanwdrr4z0wBuwWr9yB7IL606j4X1YlO5Y";

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
        `http://localhost:8000/training?${nameOk}&${typologyOk}&${muscleGroupOk}&order_by=${order}`,
        {
          headers: {
            Authorization: tokenHardcoded,
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

  useEffect(() => {
    // Actualiza la URL con las consultas de búsqueda
    const queryParams = new URLSearchParams();
    if (name) queryParams.set("name", name);
    if (typology) queryParams.set("typology", typology);
    if (muscleGroup) queryParams.set("muscle_group", muscleGroup);

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  }, [name, typology, muscleGroup]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="typology">Tipologia</label>
        <input
          type="text"
          id="typology"
          value={typology}
          onChange={(e) => handleChange("typology", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="muscleGroup">Grupo Muscular</label>
        <input
          type="text"
          id="muscleGroup"
          value={muscleGroup}
          onChange={(e) => handleChange("muscleGroup", e.target.value)}
        />
      </div>
      <button>Buscar</button>
      <select
        value=""
        name="order"
        id="order"
        onChange={(e) => {
          e.preventDefault();

          setOrder(e.target.value);

          getTrainingFetch(tokenHardcoded, setAllTraining);
        }}
      >
        <option value="">Ordenar por</option>
        <option value="name">Nombre</option>
        <option value="date">Fecha</option>
        <option value="likes">Likes</option>
      </select>
    </form>
  );
};

export default OrderAndSearchInputTraining;
