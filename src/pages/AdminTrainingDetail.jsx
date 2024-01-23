
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Details from "../components/Details/Details";
import CountLikeChecked from "../components/ButtonsLikeFav/CountLikeChecked";
import FavChecked from "../components/ButtonsLikeFav/FavChecked";
import ButtonDelete from "../components/ButtonDelete/ButtonDelete";
import { Link, useParams } from "react-router-dom";


const AdminTrainingDetail = () => {
  const  {trainingId}= useParams();
  return (
    <>
      <Header />  
      <ButtonDelete />
      <Link to={`/admin/modify/${trainingId}`}>
          <button>Modificar entreno</button>
      </Link>
      <Details />  
      <CountLikeChecked />
      <FavChecked />
    

      <Footer />
    </>
  );
};


export default AdminTrainingDetail;
