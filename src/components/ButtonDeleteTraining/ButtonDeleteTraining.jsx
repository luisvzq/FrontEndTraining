import PropTypes from "prop-types";


const ButtonDeleteTraining = ({trainingId, token, setRender}) => {

    const handleDelete = () => {
    
        async function fetchButton() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_HOST_BACK}:${
                import.meta.env.VITE_PORT_BACK
              }/training/${trainingId}`,
              {
                method: 'DELETE',
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

    return(
        <button onClick={() => { handleDelete(trainingId)}}>Delete training</button>

    )
}
ButtonDeleteTraining.propTypes = {

    trainingId: PropTypes.string,
    token: PropTypes.string,
    setRender: PropTypes.func
  };

export default ButtonDeleteTraining;