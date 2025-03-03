import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Location } from '../types';

interface GeolocationHook {
  location: Location | null;
  locationError: string;
  isLoadingLocation: boolean;
  getLocation: () => void;
}

export const useGeolocation = (): GeolocationHook => {
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      const errorMessage = 'La geolocalización no es compatible con este navegador.';
      setLocationError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  const getLocation = () => {
    setLocationError('');
    setIsLoadingLocation(true);

    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 segundos de espera
      maximumAge: 0 // No usar posición cacheada
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Se formatean las coordenadas a 16 decimales
        setLocation({
          latitude: parseFloat(position.coords.latitude.toFixed(16)),
          longitude: parseFloat(position.coords.longitude.toFixed(16)),
        });
        setIsLoadingLocation(false);
        toast.success("Ubicación capturada");
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLoadingLocation(false);
        let errorMessage = "Error desconocido al obtener la ubicación.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permiso de ubicación denegado. Habilite la ubicación en su navegador.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Información de ubicación no disponible.";
            break;
          case error.TIMEOUT:
            errorMessage = "Tiempo agotado. Busque mejor visibilidad al cielo.";
            break;
        }
        setLocationError(errorMessage);
        toast.error(errorMessage);
      },
      geolocationOptions
    );
  };

  return { location, locationError, isLoadingLocation, getLocation };
};
