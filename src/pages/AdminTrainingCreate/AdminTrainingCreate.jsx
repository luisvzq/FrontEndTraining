
import { useContext, useState } from "react";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

const AdminTrainingCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typology, setTypology] = useState("");
  const [muscular, setMuscular] = useState("");
  const [file, setFile] = useState("")

  const [context] = useContext(authContext);

  const navigate = useNavigate();


  const createTraining = async (e) => {
        e.preventDefault();
    try {
    const postBody = {
      name,
      description,
      typology,
      muscle_group: muscular, 
      // image:file
    };
    console.log("Datos a enviar: ", postBody);
    
    
      const res = await fetch(
        `${import.meta.env.VITE_HOST_BACK}:${
          import.meta.env.VITE_PORT_BACK
        }/training`,      
        {
          method: "POST",          
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type":"application/json",
            Authorization: `Bearer ${context.token}`,
          }, 
        
          body: JSON.stringify(postBody)   
        
        }
      );

      if (res.ok) {
       
       alert("La modificacion ha sido completada con exito ✌️");
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
        <h1>Añadir entreno</h1>
        
         
        <p className="intro-text">Introduce los datos</p>
        

        <form onSubmit={createTraining} className="register-container">
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



export default AdminTrainingCreate;