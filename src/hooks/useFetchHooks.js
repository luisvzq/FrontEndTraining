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
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return { getTrainingFetch };
};

export default useFetchHooks;
