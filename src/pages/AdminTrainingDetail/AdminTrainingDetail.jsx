import PropTypes from "prop-types";
import Details from "../../components/Details/Details";
//import ButtonDelete from "../../components/ButtonDelete/ButtonDelete";
import { Link, useParams } from "react-router-dom";
//import Add from "../../assets/Add.svg"
//import Edit from "../../assets/Edit.svg"

import "./AdminTrainingDetail.scss";

const AdminTrainingDetail = () => {
  const { trainingId } = useParams();
  return (
    <>
      <div className="container-admin-details">
        {/* <div className="container-EMA">
          <ButtonDelete />
          <Link to={`/admin/modificar/${trainingId}`} className="link">
          <button className="button"><img src={Edit} alt="Eliminar"className="edit"/></button>
          </Link>

          <Link to={`/admin/crear`} className="link">
            <button className="button"><img src={Add} alt="Eliminar"className="add"/></button>
          </Link>
        </div> */}
        <Details trainingId={trainingId} />
      </div>
    </>
  );
};
AdminTrainingDetail.propTypes = {
  trainingId: PropTypes.string,
};

export default AdminTrainingDetail;
