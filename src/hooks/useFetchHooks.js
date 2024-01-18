const useFetchHooks = () => {
  const getTrainingFetch = async (token, setAllTraining) => {
    try {
      const res = await fetch("http://localhost:3001/training", {
        headers: {
          Authorization: token,
        },
      });
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
