import Joi from "@hapi/joi"
import generateError from "../helpers/generateError";

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
        generateError(
          'El nombre es obligatorio y tiene un máximo de 50 caracteres.',
          400
        );
      }),
    description: Joi.string()
      .max(200)
      .required()
      .error(() => {
        generateError(
          'La descripción es obligatoria y tiene un máximo de 200 caracteres.',
          400
        );
      }),
    typology: Joi.string()
      .max(50)
      .required()
      .error(() => {
        generateError(
          'La tipología es obligatoria y tiene un máximo de 50 caracteres',
          400
        );
      }),
    muscle_group: Joi.string()
      .max(50)
      .required()
      .error(() => {
        generateError(
          'El grupo muscular es obligatorio y tiene un máximo de 50 caracteres',
          400
        );
      }),
  });
  const validation = schema.validate({
    name,
    description,
    typology,
    muscle_group,
  });

};

export default UseValidateJoiTraining;
