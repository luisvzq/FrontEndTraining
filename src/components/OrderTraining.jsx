import { useState } from "react";

const OrderAndSearchInputTraining = ({ setAllTraining }) => {
  const getTrainingFetch = async (name) => {
    try {
      const res = await fetch(
        `http://localhost:8000/training?name=${name}`
        // `http://localhost:8000/training?name=${nombre}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }
      console.log(`http://localhost:8000/training?name=${name}`);

      const body = await res.json();
      console.log(body.data);

      setAllTraining(body.data);
    } catch (error) {
      console.error("Error:", error.menssage);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        console.log(name);
        getTrainingFetch(name);
      }}
    >
      <div>
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" />
      </div>
      {/* <div>
        <label htmlFor="typology">Tipología</label>
        <input
          type="text"
          id="typology"
          value={typology}
          onChange={(e) => {
            setTypology(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="muscleGroup">Grupo Muscular</label>
        <input
          type="text"
          id="muscleGroup"
          value={muscleGroup}
          onChange={(e) => {
            setMuscleGroup(e.target.value);
            console.log(muscleGroup);
          }}
        />
      </div> */}
      <button>Buscar</button>
      <select
        value=""
        name="order"
        id="order"
        onChange={(e) => {
          e.preventDefault();

          getTrainingFetch(e.target.value);
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
