export interface Location {
  latitude: number;
  longitude: number;
}

export interface Attendance {
  id: number;
  names: string;
  register_type: string;
  location: string;
  date_time: string;
}

export interface GroupedAttendance {
  [date: string]: Attendance[];
}

export interface Feedback {
  message: string;
  isError: boolean;
}

export type RegisterType =
  | "ENTRADA_LABORAL"
  | "ALMUERZO_SALIDA"
  | "ALMUERZO_ENTRADA"
  | "SALIDA_LABORAL";
