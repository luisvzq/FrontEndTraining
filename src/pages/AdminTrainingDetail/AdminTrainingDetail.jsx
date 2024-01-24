import PropTypes from "prop-types";

import Details from "../../components/Details/Details";

import ButtonDelete from "../../components/ButtonDelete/ButtonDelete";
import { Link, useParams } from "react-router-dom";


const AdminTrainingDetail = () => {
  const  {trainingId}= useParams();
  return (
    <>  
      <ButtonDelete />
      <Link to={`/admin/modificar/${trainingId}`}>
          <button>Modificar entreno</button>
      </Link>

      <Link to={`/admin/añadir`}>
          <button>Añadir entreno</button>
      </Link>
      <Details trainingId={trainingId} />
  
    


    </>
  );
};
AdminTrainingDetail.propTypes = {
  trainingId: PropTypes.string,
};

export default AdminTrainingDetail;
