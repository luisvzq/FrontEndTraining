import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const RoutineList = ({ trainingRoutine, renderizar }) => {
  const { id } = useParams();
  const [series, setSeries] = useState(0);
  const [reps, setReps] = useState(0);
  const { hookPostPatchFetch } = useFetchHooks();

  const mutation = useMutation(hookPostPatchFetch);

  return (
    <form action="">
      <ul>
        {trainingRoutine.map((training) => {
          return (
            <li key={training.id_training}>
              <h2>{training.name}</h2>
              <p>{training.series}</p>
              <p>{training.reps}</p>

              <div>
                <label htmlFor="series">Series</label>
                <input
                  type="number"
                  min="0"
                  id="series"
                  value={training.series}
                  onChange={(e) => {
                    const postBody = {
                      idTraining: training.id_training,
                      reps,
                      series: e.target.value,
                    };
                    setSeries(e.target.value);

                    mutation.mutate(
                      {
                        endpoint: `modifyRoutine/${id}`,
                        method: "PATCH",
                        user: postBody,
                      },
                      {
                        onError: (error) => {
                          Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error,
                          });
                        },

                        onSuccess: () => {
                          // Swal.fire({
                          //   position: "top-center",
                          //   icon: "success",
                          //   title: data.message,
                          //   showConfirmButton: false,
                          //   timer: 2500,
                          //   customClass: {
                          //     popup: "rounded-popup",
                          //   },
                          // });
                          renderizar();
                        },
                      }
                    );
                  }}
                />
              </div>
              <div>
                <label htmlFor="reps">Reps</label>
                <input
                  type="number"
                  min="0"
                  id="reps"
                  value={training.reps}
                  onChange={(e) => {
                    const postBody = {
                      idTraining: training.id_training,
                      reps: e.target.value,
                      series,
                    };
                    setReps(e.target.value);
                    mutation.mutate(
                      {
                        endpoint: `modifyRoutine/${id}`,
                        method: "PATCH",
                        user: postBody,
                      },
                      {
                        onError: (error) => {
                          Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error,
                          });
                        },

                        onSuccess: () => {
                          // Swal.fire({
                          //   position: "top-center",
                          //   icon: "success",
                          //   title: data.message,
                          //   showConfirmButton: false,
                          //   timer: 2500,
                          //   customClass: {
                          //     popup: "rounded-popup",
                          //   },
                          // });
                          renderizar();
                        },
                      }
                    );
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

RoutineList.propTypes = {
  trainingRoutine: PropTypes.array,
  renderizar: PropTypes.func,
};
export default RoutineList;
