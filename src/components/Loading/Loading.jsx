
import { BeatLoader } from "react-spinners";
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <BeatLoader color="#d2691e" size={20} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
