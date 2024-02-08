
import './Loading.scss';
import  Spinner  from "../../assets/Spinner.svg";

const Loading = () => {
  return (
    <div className="loading">
   
      <img src={Spinner} alt="Spinner" className="spinner-img" />
    </div>
  );
};

export default Loading;