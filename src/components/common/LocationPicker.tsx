import React from 'react';
import { MapPin, Loader } from 'lucide-react';
import { Location } from '../../types';

interface LocationPickerProps {
  location: Location | null;
  locationError: string;
  isLoadingLocation: boolean;
  getLocation: () => void;
  isSubmitting?: boolean;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  locationError,
  isLoadingLocation,
  getLocation,
  isSubmitting = false,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">
          Ubicación
        </label>
        <button
          type="button"
          onClick={getLocation}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          disabled={isLoadingLocation || isSubmitting}
        >
          {isLoadingLocation ? (
            <>
              <Loader className="h-3 w-3 mr-1 animate-spin" />
              Obteniendo...
            </>
          ) : (
            "Obtener ubicación"
          )}
        </button>
      </div>

      <div
        className={`p-3 rounded-md flex items-start ${
          location ? "bg-green-50" : "bg-gray-50"
        }`}
      >
        <MapPin
          className={`h-5 w-5 mr-2 flex-shrink-0 ${
            location ? "text-green-500" : "text-gray-400"
          }`}
        />
        <div>
          {location ? (
            <p className="text-sm text-gray-600">
              Ubicación capturada correctamente
              <br />
              {location.latitude}, {location.longitude}
            </p>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Se requiere su ubicación para registrar la asistencia
              </p>
              <button
                type="button"
                onClick={getLocation}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                disabled={isLoadingLocation || isSubmitting}
              >
                {isLoadingLocation ? (
                  <>
                    <Loader className="h-3 w-3 mr-1 animate-spin" />
                    Obteniendo ubicación...
                  </>
                ) : (
                  "Permitir acceso a ubicación"
                )}
              </button>
            </div>
          )}
          {locationError && (
            <p className="text-sm text-red-600 mt-1">{locationError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;