const useFetchHooks = () => {
  const getTrainingFetch = async (endpoint, token) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/${endpoint}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error);
      } else {
        console.log(body.data);
        return body.data;
      }
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error.message;
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
        return body;
      }
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error.message;
    }
  };

  return { getTrainingFetch, hookPostFetch };
};

export default useFetchHooks;
