
import PropTypes from "prop-types";
import "./ButtonsLikeFav.scss"


const ButtonsLikeFav = ({details, trainingId, token, setRender}) => {

    const handleButton = (table, method) => {
    console.log(`Metodo: ${method} para la tabla: ${table}`);
    async function fetchButton() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/${table}/${trainingId}`,
          {
            method: method,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const bodyButton = await response.json();
          console.log("response bodyButton", bodyButton);
          setRender(true);
        } else {
          const body = await response.json();
          console.error("ERROR fetchButton", body.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchButton();
  }; //final del manejador

    return (
        <div className="buttonsLikeFav">
        {/* {dataTraining.LikeTrue ? 
              <img src="http://localhost:3001/logos/like_rojo.webp" alt="rojo" />
            : <img src="http://localhost:3001/logos/like_blanco.webp" alt="blanco" /> } */}

        <p>{details.allLikes}</p>
        {details.likeTrue ? (
          <button className="buttons-clf red"
            onClick={() => {
              handleButton("like", "DELETE");
            }}
          >
            Like rojo
          </button >
        ) : (
          <button className="buttons-clf white"
            onClick={() => {
              handleButton("like", "POST");
            }}
          >
            Like blanca
          </button>
        )}
        {details.favTrue ? (
          <button className="buttons-clf red"
            onClick={() => {
              handleButton("fav", "DELETE");
            }}
          >
            Fav rojo
          </button>
        ) : (
          <button className="buttons-clf white"
            onClick={() => {
              handleButton("fav", "POST");
            }}
          >
            Fav blanca
          </button>
        )}
      </div>

    )
}

ButtonsLikeFav.propTypes = {
    details: PropTypes.object,
    trainingId: PropTypes.string,
    token: PropTypes.string,
    setRender: PropTypes.func
  };

export default ButtonsLikeFav;