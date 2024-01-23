import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Details from "../components/Details/Details";
import CountLikeChecked from "../components/ButtonsLikeFav/CountLikeChecked";
import FavChecked from "../components/ButtonsLikeFav/FavChecked";
import ButtonDelete from "../components/ButtonDelete/ButtonDelete";

const AdminTrainingDetail = () => {

  return (
    <>
      <Header />  
  
      <Details />  
      <CountLikeChecked />
      <FavChecked />
      <ButtonDelete />

      <Footer />
    </>
  );
};


export default AdminTrainingDetail;
