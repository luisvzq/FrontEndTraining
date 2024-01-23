
import { useContext, useEffect, useState } from "react";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

const AdminTrainingModify = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typology, setTypology] = useState("");
  const [muscular, setMuscular] = useState("");
  const [file, setFile] = useState("")

  const [context] = useContext(authContext);
  const  {trainingId}= useParams();
  const navigate = useNavigate();




  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_BACK}:${
            import.meta.env.VITE_PORT_BACK
          }/training/${trainingId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          }
        );

        if (response.ok) {
          const body = await response.json();
          console.log("respuesta entreno:", body.data);

           setName(body.data.name);
          setDescription(body.data.description);
          setTypology(body.data.typology);
          setMuscular(body.data.muscle_group);
          // setFile(body.data.photo);
        } else {
          throw new Error("Error al hacer fetch al entreno ");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [trainingId, context]);



  const modifyTraining = async (e) => {
        e.preventDefault();

    const postBody = {
      name,
      typology,
      muscle_group: muscular, 
      photo:file
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/modify/${trainingId}`,
        {
          body: JSON.stringify(postBody),
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.ok) {
       
       alert("El registro ha sido completado con exito ✌️");
        navigate("/entrenos");
        setName("");
        setDescription("");
        setTypology("");
        setMuscular("");
      } else {
        const body = await res.json();    
      console.log(body.error);

      }
    } catch (error) {
  
      console.error(error);
    }
  };




    return(
      <>
      <Header />
    
      <section className="register-page">
        <h1>Modificar entreno</h1>
        
         
        <p className="intro-text">Introduce los datos</p>
        

        <form onSubmit={modifyTraining} className="register-container">
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
          <input
            type="file"
            name="photo"
            id="photo"
            value={file}
            onChange={(e) => setFile(e.target.value)}
        
          />

        

          <input type="submit" className="submit-btn" />
        </form>
      </section>

      <Footer />
      </>

    )
}



export default AdminTrainingModify;