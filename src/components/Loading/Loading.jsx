
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 999,
      }}
    >
      <BeatLoader color="#d2691e" size={20} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
