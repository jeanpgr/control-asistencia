import { Attendance } from '../types';
import { API_BASE_URL, TIME_APIS } from './constants';

export const fetchAttendances = async (): Promise<Attendance[]> => {
  const response = await fetch(`${API_BASE_URL}/asistencia`);
  if (!response.ok) {
    throw new Error('Error al obtener los registros de asistencia');
  }
  
  return await response.json();
};

export const submitAttendance = async (
  names: string, 
  register_type: string, 
  location: string
): Promise<void> => {
  try {
    // Obtenemos la fecha y hora de Ecuador
    const date_time = await getEcuadorTime();
    
    // Construimos el objeto a enviar
    const bodyData = {
      names,
      register_type,
      location,
      date_time,
    };

    const response = await fetch(`${API_BASE_URL}/asistencia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al enviar el registro");
    }
  } catch (error) {
    console.error("Error en submitAttendance:", error);
    throw error;
  }
};

const getEcuadorTime = async (): Promise<string> => {
  // Intentamos con cada API hasta que una funcione
  for (const api of TIME_APIS) {
    try {
      // Intentamos hasta 3 veces con cada API
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await fetch(api.url);
          
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          
          const data = await response.json();
          if (data && data[api.field]) {
            // Convertimos a formato "Y-m-d H:i:s"
            const date = new Date(data[api.field]);
            return formatDateTime(date);
          }
          
          throw new Error(`Campo ${api.field} no encontrado`);
        } catch (err) {
          // Si es el último intento, lanzamos el error
          if (attempt === 2) throw err;
          
          // Esperamos un breve tiempo antes de reintentar
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.warn(`Error con API ${api.url}:`, error);
      // Continuamos con la siguiente API
    }
  }
  
  // Si todas las APIs fallan, lanzamos un error
  throw new Error("No se pudo obtener la hora de Ecuador");
};

/**
 * Formatea un objeto Date al formato "Y-m-d H:i:s"
 */
const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

