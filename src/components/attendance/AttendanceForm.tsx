import React, { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { useGeolocation } from "../../hooks/useGeolocation";
import { Feedback } from "../../types";
import { submitAttendance } from "../../utils/api";
import { REGISTER_TYPES } from "../../utils/constants";
import Alert from "../common/Alert";
import Button from "../common/Button";
import LocationPicker from "../common/LocationPicker";

function AttendanceForm() {
  const [fullName, setFullName] = useState("");
  const [mealType, setMealType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({ message: "", isError: false });
  
  const { 
    location, 
    locationError, 
    isLoadingLocation, 
    getLocation 
  } = useGeolocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!fullName.trim()) {
      setFeedback({
        message: "Por favor, ingrese su nombre completo.",
        isError: true,
      });
      toast.error("Por favor, ingrese su nombre completo.");
      return;
    }

    if (!mealType) {
      setFeedback({
        message: "Por favor, seleccione un tipo de registro.",
        isError: true,
      });
      toast.error("Por favor, seleccione un tipo de registro.");
      return;
    }

    if (!location) {
      setFeedback({
        message:
          "Se requiere la ubicación. Por favor, permita el acceso a su ubicación.",
        isError: true,
      });
      toast.error(
        "Se requiere la ubicación. Por favor, permita el acceso a su ubicación."
      );
      getLocation();
      return;
    }

    setIsSubmitting(true);
    setFeedback({ message: "", isError: false });
    const loadingToast = toast.loading("Enviando registro...");

    try {
      // Se formatean las coordenadas a 16 decimales al enviarlas
      await submitAttendance(
        fullName,
        mealType,
        `${location.latitude.toFixed(16)}, ${location.longitude.toFixed(16)}`
      );
      
      toast.dismiss(loadingToast);
      toast.success("Registro enviado correctamente");
      setFeedback({
        message: "Registro enviado correctamente.",
        isError: false,
      });
      // Resetear formulario
      setFullName("");
      setMealType("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : "Error al enviar el registro");
      setFeedback({
        message:
          error instanceof Error
            ? error.message
            : "Error al enviar el registro. Intente nuevamente.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Registro de Asistencia
        </h2>

        <Alert feedback={feedback} />

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su nombre y apellido"
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mealType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipo de Registro
            </label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Seleccione una opción</option>
              {REGISTER_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <LocationPicker
            location={location}
            locationError={locationError}
            isLoadingLocation={isLoadingLocation}
            getLocation={getLocation}
            isSubmitting={isSubmitting}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            fullWidth
            icon={<Send className="h-4 w-4" />}
          >
            Enviar Registro
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AttendanceForm;