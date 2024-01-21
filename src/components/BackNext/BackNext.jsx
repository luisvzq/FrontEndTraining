
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./BackNext.scss"

  const BackNext = ({dataTraining, trainingId}) => {
    const indice = dataTraining.findIndex ((item)=>item.id===Number(trainingId)); 
    return (
      <div className="backNext"    >
      {indice > 0 && (
        // Si hay un elemento anterior, muestra el enlace
        <Link to={`/entreno/${dataTraining[indice - 1].id}`}>Anterior</Link>
      )}
      {" | "}
      {indice < dataTraining.length - 1 && (
        // Si hay un elemento siguiente, muestra el enlace
        <Link to={`/entreno/${dataTraining[indice + 1].id}`}>Siguiente</Link>
      )}
    </div>
    )
}

BackNext.propTypes = {
  dataTraining: PropTypes.array,
  trainingId: PropTypes.string,


};

export default BackNext;