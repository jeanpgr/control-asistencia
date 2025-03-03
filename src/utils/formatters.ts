export const formatTime = (dateTimeStr: string): string => {
  // Reemplazamos el espacio por "T" y agregamos el offset "-05:00" para Ecuador
  const isoString = dateTimeStr.replace(" ", "T") + "-05:00";
  const dateObj = new Date(isoString);
  return dateObj.toLocaleTimeString("es-EC", {
    timeZone: "America/Guayaquil",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatDate = (dateStr: string): string => {
  // Aseguramos que la fecha se interprete correctamente para Ecuador
  const isoString = dateStr + "T00:00:00";
  const dateObj = new Date(isoString);
  return dateObj.toLocaleDateString("es-EC", {
    timeZone: "America/Guayaquil",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatCurrentTime = (): string => {
  return new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Forzamos el formato de 24 horas
  });
};

export const openInGoogleMaps = (locationStr: string): void => {
  const [latitude, longitude] = locationStr
    .split(",")
    .map((coord) => coord.trim());
  const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(url, "_blank");
};
