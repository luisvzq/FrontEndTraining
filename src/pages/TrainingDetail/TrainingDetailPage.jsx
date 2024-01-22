import PropTypes from "prop-types";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useParams } from "react-router-dom";
import Details from "../../components/Details/Details";
import CountLikes from "../../components/ButtonsLikeFav/CountLikes";
import LikeChecked from "../../components/ButtonsLikeFav/LikeChecked";
import FavChecked from "../../components/ButtonsLikeFav/FavChecked";


const TrainingDetailPage = () => {

let  {trainingId}= useParams();

  return (
    <>
      <Header />  

      <Details trainingId={trainingId}/>
      <CountLikes trainingId={trainingId}/>
      {/* <LikeChecked trainingId={trainingId}/> */}
      {/* <FavChecked trainingId={trainingId}/> */}

      <Footer />
    </>
  );
};

TrainingDetailPage.propTypes = {
  trainingId: PropTypes.string,


};

export default TrainingDetailPage;
