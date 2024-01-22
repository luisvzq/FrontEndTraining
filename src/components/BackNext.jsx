

import { Link } from "react-router-dom";

  const BackNext = ({trainingId}) => {
    const indice = 
    
    return (
      <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
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

export default BackNext;