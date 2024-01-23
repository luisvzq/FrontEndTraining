import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Details from "../../components/Details/Details";
import FavChecked from "../../components/ButtonsLikeFav/FavChecked";
import CountLikeChecked from "../../components/ButtonsLikeFav/CountLikeChecked";

const TrainingDetailPage = () => {
  let { trainingId } = useParams();

  return (
    <>
      <Details trainingId={trainingId} />
      <CountLikeChecked trainingId={trainingId} />
      <FavChecked trainingId={trainingId} />
    </>
  );
};

TrainingDetailPage.propTypes = {
  trainingId: PropTypes.string,
};

export default TrainingDetailPage;
