import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Details from "../../components/Details/Details";

const TrainingDetailPage = () => {
  let { trainingId } = useParams();

  return (
    <>
      <div>
        <Details trainingId={trainingId} />
      </div>
    </>
  );
};

TrainingDetailPage.propTypes = {
  trainingId: PropTypes.string,
};

export default TrainingDetailPage;
