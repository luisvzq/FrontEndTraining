import { useContext, useState } from "react";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import "./AdminTrainingCreate.scss";
import UseValidateJoiTraining from "../../hooks/UseValidateJoiTraining";
import UseValidate from "../../hooks/UseValidate";

const AdminTrainingCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typology, setTypology] = useState("");
  const [muscular, setMuscular] = useState("");

  const [context] = useContext(authContext);
  const navigate = useNavigate();

  const createTraining = async (e) => {
    e.preventDefault();
     
     const validated = UseValidate(name, description, typology, muscular);
    // const {error}= await UseValidateJoiTraining(name, description, typology,muscular)
    // console.log(error);

    if (validated) {
      try { 
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("typology", typology);
        formData.append("muscle_group", muscular);
        formData.append("image", e.target.elements.photo.files[0]);

        const res = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/training`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
            body: formData,
          }
        );

        if (res.ok) {
          alert("La modificacion ha sido completada con exito ✌️");
          navigate("/admin/entrenos");
          setName("");
          setDescription("");
          setTypology("");
          setMuscular("");
        } else {
          const body = await res.json();
          console.log(body);
        }
      } catch (error) {
         console.error(error);

      
      }
    }
  };

  return (
    <>
      <Header />
      <section className="create-page">
        <h1>Añadir entreno</h1>

        <p className="intro-text">Introduce los datos</p>

        <form onSubmit={createTraining} className="create-container">
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
      </section>

      <Footer />
    </>
  );
};

export default AdminTrainingCreate;
