import { RegisterType } from "../types";

export const API_BASE_URL = "https://asistencia.ws-dragoncentury.info";
export const API_DATE_TIME = "https://worldtimeapi.org/api/timezone/America/Guayaquil";

export const REGISTER_TYPES: { value: RegisterType; label: string }[] = [
  { value: "ENTRADA_LABORAL", label: "ENTRADA LABORAL" },
  { value: "ALMUERZO_SALIDA", label: "ALMUERZO SALIDA" },
  { value: "ALMUERZO_ENTRADA", label: "ALMUERZO ENTRADA" },
  { value: "SALIDA_LABORAL", label: "SALIDA LABORAL" },
];

export const REGISTER_TYPE_STYLES = {
  ENTRADA_LABORAL: "bg-green-100 text-green-800",
  ALMUERZO_SALIDA: "bg-yellow-100 text-yellow-800",
  ALMUERZO_ENTRADA: "bg-blue-100 text-blue-800",
  SALIDA_LABORAL: "bg-red-100 text-red-800",
};
