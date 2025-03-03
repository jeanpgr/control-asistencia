import { Attendance } from '../types';
import { API_BASE_URL, API_DATE_TIME } from './constants';

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
    // Obtenemos la fecha y hora en el formato deseado "Y-m-d H:i:s"
    const date_time = await getDateTime();
    
    // Construimos el objeto a enviar, incluyendo el campo date_time
    const bodyData = {
      names,
      register_type,
      location,
      date_time, // Se envía con el formato "Y-m-d H:i:s"
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

const getDateTime = async (): Promise<string> => {
  const response = await fetch(API_DATE_TIME);
  
  if (!response.ok) {
    throw new Error('Error al obtener la hora del servidor');
  }
  
  const data = await response.json();
  // Se asume que la API devuelve la fecha y hora en alguna de estas propiedades: "date_time" o "datetime"
  console.log('Data:', data);
  const dateTimeStr = data.datetime;
  if (!dateTimeStr) {
    throw new Error('Formato inesperado en la respuesta de la fecha y hora');
  }
  
  // Convertir la cadena obtenida en un objeto Date
  const date = new Date(dateTimeStr);

  // Extraer cada componente y formatear en "Y-m-d H:i:s"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript inician en 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

