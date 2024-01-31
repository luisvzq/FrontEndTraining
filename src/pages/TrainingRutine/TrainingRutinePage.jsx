import { useState } from "react";
import useFetchHooks from "../../hooks/useFetchHooks";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

import jsPDF from "jspdf";

const TrainingRutinePage = () => {
  // Estado para almacenar los entrenamientos
  const { hookGetFetch } = useFetchHooks();

  const [entrenamientos, setEntrenamientos] = useState([]);
  // Estado para el entrenamiento seleccionado
  const [entrenamientoSeleccionado, setEntrenamientoSeleccionado] =
    useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [rutinaLocal, setRutinaLocal] = useState([]);
  const localStorageKey = "Rutina";

  const { isLoading } = useQuery(
    [`training`, "training"],
    () => hookGetFetch(`training`),
    {
      onSuccess: (data) => {
        setEntrenamientos(data);
      },
    }
  );

  const handleRutineLocalStorage = (e) => {
    const selectedTraining = e.target.value;
    setEntrenamientoSeleccionado(selectedTraining);

    const localStorageData =
      JSON.parse(localStorage.getItem(localStorageKey)) || [];

    const isTrainingAlreadyAdded = localStorageData.includes(selectedTraining);

    if (!isTrainingAlreadyAdded) {
      localStorageData.push(selectedTraining);
      localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Entreno de ${selectedTraining} se ha añadido a rutinas!`,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "rounded-popup",
        },
      });
    } else {
      Swal.fire(`${selectedTraining} ya está guardado en rutinas!`);
    }
  };

  const handleDeleteTrainingRutine = (index) => {
    const localStorageData =
      JSON.parse(localStorage.getItem(localStorageKey)) || [];
    localStorageData.splice(index, 1); // Elimina el elemento en la posición index
    localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
    setRutinaLocal([...localStorageData]);
  };

  const generarPDF = () => {
    const pdf = new jsPDF();

    // Título de la rutina
    pdf.text("Rutina para Angel", 20, 10);

    // Descripción ingresada en el textarea
    pdf.text("Descripción: " + description, 20, 20);

    // Lista de entrenamientos
    const rutina = JSON.parse(localStorage.getItem("Rutina")) || [];
    rutina.forEach((training, index) => {
      pdf.text(`${index + 1}. ${training}`, 20, 30 + index * 10);
    });

    pdf.save("rutina_para_angel.pdf");
  };

  return (
    <div>
      <h1>Selecciona un entrenamiento:</h1>

      <select
        value={entrenamientoSeleccionado}
        onChange={handleRutineLocalStorage}
      >
        {/* Opción por defecto */}
        <option value="">Selecciona un entrenamiento</option>
        {/* Mapear los entrenamientos en opciones del select */}
        {entrenamientos.map((entrenamiento) => (
          <option key={entrenamiento.id} value={entrenamiento.name}>
            {entrenamiento.name}
          </option>
        ))}
      </select>

      <h2>Rutina</h2>

      <ul>
        {(() => {
          const rutine = JSON.parse(localStorage.getItem("Rutina")) || [];

          return rutine.map((training, index) => (
            <li
              key={index}
              onClick={() => {
                handleDeleteTrainingRutine(index);
              }}
            >
              {training}
            </li>
          ));
        })()}
      </ul>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Añade una descripción..."
      />

      <form>
        <p>Introduzca un mail para enviar la rutina creada</p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={generarPDF}>PDF</button>
      </form>
    </div>
  );
};

export default TrainingRutinePage;
