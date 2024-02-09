import PropTypes from "prop-types";
import { useMutation } from "react-query";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import RoutineDeleteTraining from "../RoutineDeleteTraining/RoutineDeleteTraining";
import "./RoutineList.scss";
const RoutineList = ({ trainingRoutine, renderizar }) => {
  const { id } = useParams();
  const { hookPostPatchFetch } = useFetchHooks();
  const mutation = useMutation(hookPostPatchFetch);

  return (
    <form action="">
      <ul>
        {trainingRoutine.map((training) => {
          return (
            <li className="list-format" key={training.id_training}>
              <div className="routine-training-name">
                <h3 className="routine-h2">{training.name}</h3>
              </div>

              <div className="series-reps">
                <div>
                  <label className="label-number" htmlFor="series">
                    Series
                  </label>
                  <input
                    className="number-imput"                  
                    type="number"
                    min="0"
                    id="series"
                    value={training.series}
                    onChange={(e) => {
                      const postBody = {
                        idTraining: training.id_training,
                        reps: training.reps,
                        series: e.target.value || 0,
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

                          onSuccess: () => {
                            renderizar();
                          },
                        }
                      );
                    }}
                  />
                </div>
                <div>
                  <label className="label-number" htmlFor="reps">
                    Reps
                  </label>
                  <input
                    className="number-imput"
                    type="number"
                    min="0"
                    id="reps"
                    value={training.reps}
                    onChange={(e) => {
                      const postBody = {
                        idTraining: training.id_training,
                        reps: e.target.value || 0,
                        series: training.series,
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

                          onSuccess: () => {
                            renderizar();
                          },
                        }
                      );
                    }}
                  />
                </div>
              </div>
              <RoutineDeleteTraining
                trainingRoutineId={training.id}
                renderizar={renderizar}
              />
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
