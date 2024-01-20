import PropTypes from "prop-types";
const Details = ({details}) => {
    return(
<div>
      <h1>{details.name}</h1>
      <img
        src={`${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/${details.photo}`}
        alt="Foto de entreno"
      />
      <p>Description: {details.description}</p>
      <button>Typology: {details.typology}</button>
      <button>Muscle group: {details.muscle_group}</button>
      <p>Likes: {details.allLikes}</p>
</div>
    )
}

Details.propTypes = {
    details: PropTypes.array
}
export default Details;