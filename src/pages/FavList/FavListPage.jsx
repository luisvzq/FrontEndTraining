import { useContext, useEffect, useState } from "react";
import Training from "../../components/Training/Training.jsx";
import "./FavListPage.scss";
import Loading from "../../components/Loading/Loading.jsx";
import { authContext } from "../../context/AuthContext.jsx";

const FavListPage = () => {
  const [allFavs, setAllFavs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [context] = useContext(authContext);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/fav`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const body = await response.json();
          setAllFavs(body.data);
          setIsLoading(false);
          setRender(false);
          console.log("Info array:", body.data);
        } else {
          throw new Error("Error al hacer fetch al entreno ");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [context, render]);

  return (
    <>
      <div className="training-list-fav">
        <h2>Entranamientos Favoritos</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <Training data={allFavs} setRender={setRender} />
        )}
      </div>
    </>
  );
};

export default FavListPage;
