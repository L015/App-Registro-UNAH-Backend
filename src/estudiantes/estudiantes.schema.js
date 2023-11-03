import Joi from "joi";

const schemaEstudiantes = Joi.object({
  dni: Joi.string().length(15).required(),
  numero_cuenta: Joi.string().length(11).required(),
  carrera: Joi.string().length(8).required(),
  certificados_id_certificado: Joi.string().length(8).required(),
  contrasenia: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,40}$')).required(),
  descripcion: Joi.string().max(200).required(),
})