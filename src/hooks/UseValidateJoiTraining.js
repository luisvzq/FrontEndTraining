import Joi from "joi";

// Hacemos las correspondientes validaciones con un esquema de Joi
const UseValidateJoiTraining = async ({
  name,
  description,
  typology,
  muscle_group,
}) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .max(50)
      .required()
      .error(() => {
        alert("El nombre es obligatorio y tiene un máximo de 50 caracteres.");
      }),

    description: Joi.string()
      .max(200)
      .required()
      .error(() => {
        alert(
          "La descripción es obligatoria y tiene un máximo de 200 caracteres."
        );
      }),
    typology: Joi.string()
      .max(50)
      .required()
      .error(() => {
        alert("La tipología es obligatoria y tiene un máximo de 50 caracteres");
      }),
    muscle_group: Joi.string()
      .max(50)
      .required()
      .error(() => {
        alert(
          "El grupo muscular es obligatorio y tiene un máximo de 50 caracteres"
        );
      }),
  });

  schema.validate({
    name,
    description,
    typology,
    muscle_group,
  });
};

export default UseValidateJoiTraining;
