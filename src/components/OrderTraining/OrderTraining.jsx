import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { authContext } from "../../context/AuthContext";

import "./OrderTraining.scss";
import { useSearchParams } from "react-router-dom";

const OrderAndSearchInputTraining = ({ setAllTraining }) => {
  const [context] = useContext(authContext);

  const [searchParams, setSearchParams]=useSearchParams()

  // const [searchParams, setSearchParams] = useState({
  //   name: "",
  //   typology: "",
  //   muscle_group: "",
  //   order_by: "",
  // });

  //Convierte cuaquier tipo de objeto pro- valor en objeto normal
// Object.fromEntries(searchParams);

console.log(Object.fromEntries(searchParams));

  const handleChange = (field, value) => {
    searchParams.set(field,value);
    setSearchParams(new URLSearchParams(searchParams));
  };
  // const [debouncedSearchParams, setDebouncedSearchParams] =
  //   useState(searchParams);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   getTrainingFetch();
  // };
  useEffect(() => {
  const getTrainingFetch = async () => {
    try {
      const queryParams = searchParams.toString();
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
  
  
    const timerId=setTimeout(  getTrainingFetch, 600);

    // const timerId = setTimeout(() => {
    //   setDebouncedSearchParams(searchParams);
    // }, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchParams, context.token, setAllTraining]);

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(searchParams).toString();
  //   const search = queryParams ? `?${queryParams}` : "";
  //   window.history.replaceState({}, "", `${window.location.pathname}${search}`);
  //   getTrainingFetch();
  // }, [debouncedSearchParams]);

  return (
    <form className="order-training-form">
      <div className="search-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={searchParams.get("name")||""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="search-group">
        <label htmlFor="typology">Tipologia</label>
        <input
          type="text"
          id="typology"
          value={searchParams.get("typology")||""}
          onChange={(e) => handleChange("typology", e.target.value)}
        />
      </div>

      <div className="search-group">
        <label htmlFor="muscleGroup">Grupo Muscular</label>
        <input
          type="text"
          id="muscleGroup"
          value={searchParams.get("muscle_group")||""}
          onChange={(e) => handleChange("muscle_group", e.target.value)}
        />
      </div>
      <div className="order-group">
        <label htmlFor="order"></label>
        <select
          value={searchParams.get("order_by")||""}
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
      {/* <button type="submit">Buscar</button> */}
    </form>
  );
};

OrderAndSearchInputTraining.propTypes = {
  setAllTraining: PropTypes.func,
};

export default OrderAndSearchInputTraining;
