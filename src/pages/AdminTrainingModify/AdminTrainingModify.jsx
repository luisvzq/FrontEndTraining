import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import UseValidate from "../../hooks/UseValidate";
import Swal from "sweetalert2";
import "./AdminTrainingModify.scss";
import Loading from "../../components/Loading/Loading";

import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const AdminTrainingModify = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typology, setTypology] = useState("");
  const [muscular, setMuscular] = useState("");
  const [dataDb, setDataDb] = useState({});

  const [setShakeAnimation] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [context] = useContext(authContext);
  const { trainingId } = useParams();
  const navigate = useNavigate();

  const { hookGetFetch } = useFetchHooks();

  const { isLoading, isSuccess } = useQuery(
    [`training/${trainingId}`, `training/${trainingId}`],
    () => hookGetFetch(`training/${trainingId}`),
    {
      onSuccess: (data) => {
        setDataDb(data);
        setName(data.name);
        setDescription(data.description);
        setTypology(data.typology);
        setMuscular(data.muscle_group);
      },
    }
  );

  const modifyTraining = async (e) => {
    e.preventDefault();
    if (
      dataDb.name === name &&
      dataDb.description === description &&
      dataDb.muscle_group === muscular &&
      dataDb.typology === typology
    ) {
      setStatusMessage("Debes cambiar algún dato ✌️");
      setShakeAnimation(true);
      setTimeout(() => {
        setShakeAnimation(false);
      }, 500);
    } else {
      const validated = UseValidate(
        name,
        description,
        typology,
        muscular,
        setStatusMessage,
        setShakeAnimation
      );

      if (validated) {
        try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("description", description);
          formData.append("typology", typology);
          formData.append("muscle_group", muscular);
          formData.append("image", e.target.elements.photo.files[0]);

          console.log("Datos a enviar: ", formData);

          const res = await fetch(
            `${import.meta.env.VITE_HOST_BACK}:${
              import.meta.env.VITE_PORT_BACK
            }/training/${trainingId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${context.token}`,
              },
              body: formData,
            }
          );

          if (res.ok) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: `La modificacion ha sido completada con exito!`,
              showConfirmButton: false,
              timer: 2500,
              customClass: {
                popup: "rounded-popup",
              },
            });

            navigate(`/admin/entreno/${trainingId}`);
            setName("");
            setDescription("");
            setTypology("");
            setMuscular("");
          } else {
            const body = await res.json();
            console.log(body.error);
            setStatusMessage(body.error);
            setShakeAnimation(true);
            setTimeout(() => {
              setShakeAnimation(false);
            }, 500);
          }
        } catch (error) {
          console.error(error);
          setShakeAnimation(true);
          setTimeout(() => {
            setShakeAnimation(false);
          }, 500);
        }
      }
    }
  };

  return (
    <>
      <section className="modify-page">
        <h1>Modificar entreno</h1>

        <ErrorMessage message={statusMessage} />
        {isLoading ? <Loading /> : null}
        {isSuccess ? (
          <form onSubmit={modifyTraining} className="modify-container">
            <label htmlFor="name">Nombre entreno</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="typology">Tipología</label>
            <input
              type="text"
              name="typology"
              id="typology"
              value={typology}
              onChange={(e) => setTypology(e.target.value)}
            />

            <label htmlFor="group">Grupo muscular</label>
            <input
              type="text"
              name="group"
              id="group"
              value={muscular}
              onChange={(e) => setMuscular(e.target.value)}
            />

            <label htmlFor="description">Descripcion</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="photo">Subir imagen</label>
            <input type="file" name="photo" id="photo" />

            <button type="submit" className="submit-btn">
              Enviar
            </button>
          </form>
        ) : null}
      </section>
    </>
  );
};

export default AdminTrainingModify;
