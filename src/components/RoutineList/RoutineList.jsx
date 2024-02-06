import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const RoutineList = ({ trainingRoutine }) => {
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
                  id="series"
                  value={series}
                  onChange={(e) => {
                    setSeries(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="reps">Reps</label>
                <input
                  type="number"
                  id="reps"
                  value={training.reps}
                  onChange={(e) => {
                    const postBody = {
                      idTraining: training.id_training,
                      reps: e.target.value,
                      series,
                    };

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

                        onSuccess: (data) => {
                          Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: data.message,
                            showConfirmButton: false,
                            timer: 2500,
                            customClass: {
                              popup: "rounded-popup",
                            },
                          });
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
};
export default RoutineList;
