const useFetchHooks = () => {
  const hookGetFetch = async (endpoint, token) => {
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
        
        return body.data;
      }
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error.message;
    }
  };

  const hookPostPatchFetch = async ({ endpoint,method, user }) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/${endpoint}`,
        {
          body: JSON.stringify(user),
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const body = await res.json();

      if (!res.ok) {
        
        throw new Error(body.error);
      } else {
        return body;
      }
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      throw error.message;
    }
  };

  return { hookGetFetch, hookPostPatchFetch };
};

export default useFetchHooks;
