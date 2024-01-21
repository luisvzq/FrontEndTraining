
import PropTypes from "prop-types";
import "./Details.scss"
const Details = ({details}) => {
    return(
      <>
    <h1 className="title">{details.name}</h1>
    <div className="details">        
          <img className="photo"
            src={`${import.meta.env.VITE_HOST_BACK}:${
              import.meta.env.VITE_PORT_BACK
            }/${details.photo}`}
            alt="Foto de entreno"
          />
          <div className="information">
              <p className="description">Description: {details.description}</p>
              <button>Typology: {details.typology}</button>
              <button>Muscle group: {details.muscle_group}</button>
          </div>     
      
    </div>
    </>
    )
}

Details.propTypes = {
    details: PropTypes.object
}
export default Details;