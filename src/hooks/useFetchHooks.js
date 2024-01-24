const useFetchHooks = () => {
  const getTrainingFetch = async (token, setAllTraining) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/training`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }

      const body = await res.json();

      setAllTraining(body.data);
      console.log("Total de entrenos: ", body.data.length);
      return body.data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const hookPostFetch = async ({ endpoint, user }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/${endpoint}`,
        {
          body: JSON.stringify(user),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const body = await res.json();
     
      if (!res.ok) {
        console.log(body);
        throw new Error(body.error);
      } else {
        return await res.json();
      }
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error.message;
    }
  }

  return { getTrainingFetch, hookPostFetch };
};

export default useFetchHooks;


