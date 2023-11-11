import { StatusCodes } from "http-status-codes";
import path from "node:path";

import createPool from "../database/database.config.js";
import { fnSPCUD, fnSPGet } from "../utils/databaseFunctions.js";
import { schemaConfigurarPeriodo } from "./admin.schema.js";
import formatearFecha from '../utils/formatearFechas.js'


const pool = await createPool()

export class AdminService {
  async configurarPeriodo(data) {
    const {error} = schemaConfigurarPeriodo.validate(data)

    if (error) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crar una nueva configuracion del periodo: ${error.details[0].message}`,
        token: null
      };
    }
  
    const {
      p_fec_nota_ini,
      p_fec_nota_fin,
      p_periodo_periodo,
      p_periodo_anio,
      p_periodo_duracion_id,
      p_fec_ini_plan,
      p_fec_final_plan,
      p_fec_can_exp_ini,
      p_fec_can_exp_fin,
      p_fec_periodo_ini,
      p_fec_periodo_fin
    } = data;

    // console.log(formatearFecha(p_fec_nota_fin))

    const nuevoPeriodo = await fnSPCUD(pool, "INGRESAR_PERIODO", [
      formatearFecha(p_fec_nota_ini),
      formatearFecha(p_fec_nota_fin),
      p_periodo_periodo,
      p_periodo_anio,
      formatearFecha(p_periodo_duracion_id),
      formatearFecha(p_fec_ini_plan),
      formatearFecha(p_fec_final_plan),
      formatearFecha(p_fec_can_exp_ini),
      formatearFecha(p_fec_can_exp_fin),
      formatearFecha(p_fec_periodo_ini),
      formatearFecha(p_fec_periodo_fin)
    ]);

    console.log(nuevoPeriodo)

    if (nuevoPeriodo === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Algun dato invalido`,
      };
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: `Nuevo periodo configurado correctamente`,
    };
  }
}
