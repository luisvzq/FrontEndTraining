import { Link } from "react-router-dom";
import OrderAndSearchInputTraining from "../../components/OrderTraining/OrderTraining.jsx";

import Add from "../../assets/Add.svg";
import "./TrainingListPage.scss";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext.jsx";

const TrainingListPage = () => {
  const [context] = useContext(authContext);

  return (
    <div className="training-list">
      <h1>Entrenamientos</h1>
      {context.role === "admin" && (
        <Link to="/admin/crear" className="linkList">
          <button className="buttonAdd">
            <img src={Add} alt="Añadir" className="add" />
          </button>
        </Link>
      )}
      <OrderAndSearchInputTraining />
    </div>
  );
};

export default TrainingListPage;
