import PropTypes from "prop-types";
import Details from "../../components/Details/Details";
import ButtonDelete from "../../components/ButtonDelete/ButtonDelete";
import { Link, useParams } from "react-router-dom";

import "./AdminTrainingDetail.scss";

const AdminTrainingDetail = () => {
  const { trainingId } = useParams();
  return (
    <>
      <div className="container-admin-details">
        <div className="container-EMA">
          <ButtonDelete />
          <Link to={`/admin/modificar/${trainingId}`}>
            <button className="tag">Modificar entreno</button>
          </Link>

          <Link to={`/admin/crear`}>
            <button className="tag">Añadir entreno</button>
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
