import PropTypes from "prop-types";
import Details from "../../components/Details/Details";
import ButtonDelete from "../../components/ButtonDelete/ButtonDelete";
import { Link, useParams } from "react-router-dom";

import "./AdminTrainingDetail.scss"

const AdminTrainingDetail = () => {
  const { trainingId } = useParams();
  return (
    <>
      <div className="container-admin-details">
        <div className="container-EMA">
          <ButtonDelete />
          <Link to={`/admin/modificar/${trainingId}`}>
            <button>Modificar entreno</button>
          </Link>

          <Link to={`/admin/nuevo-entreno`}>
            <button>Añadir entreno</button>
          </Link>
        </div>
        <Details trainingId={trainingId} />
      </div>
    </>
  );
};
AdminTrainingDetail.propTypes = {
  trainingId: PropTypes.string,
};

export default AdminTrainingDetail;
