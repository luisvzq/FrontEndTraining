import PropTypes from "prop-types";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useParams } from "react-router-dom";
import Details from "../../components/Details/Details";
import FavChecked from "../../components/ButtonsLikeFav/FavChecked";
import CountLikeChecked from "../../components/ButtonsLikeFav/CountLikeChecked";


const TrainingDetailPage = () => {

let  {trainingId}= useParams();



  return (
    <>
      <Header />  
  
      <Details trainingId={trainingId}/>  
      <CountLikeChecked trainingId={trainingId}/>
      <FavChecked trainingId={trainingId}/>

      <Footer />
    </>
  );
};

TrainingDetailPage.propTypes = {
  trainingId: PropTypes.string,


};

export default TrainingDetailPage;
