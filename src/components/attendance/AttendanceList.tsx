import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Search, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Attendance, GroupedAttendance } from '../../types';
import { fetchAttendances } from '../../utils/api';
import { formatDate, formatTime, openInGoogleMaps } from '../../utils/formatters';
import { REGISTER_TYPE_STYLES } from '../../utils/constants';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

function AttendanceList() {
  const [, setAttendances] = useState<Attendance[]>([]);
  const [groupedAttendances, setGroupedAttendances] = useState<GroupedAttendance>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadAttendances = async (refreshing: boolean = false) => {
    try {
      setError('');
      if (!refreshing) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const loadingToast = refreshing ? 
        toast.loading('Actualizando registros...') : 
        toast.loading('Cargando registros...');

      const data = await fetchAttendances();
      setAttendances(data);
      console.log('Attendances:', data);
      // Agrupar registros por fecha
      const grouped = data.reduce((acc: GroupedAttendance, attendance: Attendance) => {
        const date = attendance.date_time.split(' ')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(attendance);
        return acc;
      }, {});

      setGroupedAttendances(grouped);
      toast.dismiss(loadingToast);

      if (refreshing) {
        toast.success('Registros actualizados correctamente');
      }
    } catch (error) {
      console.error('Error fetching attendances:', error);
      const errorMessage = 'Error al cargar los registros de asistencia. Por favor, intente nuevamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAttendances();
  }, []);

  const handleRefresh = () => {
    loadAttendances(true);
  };

  const filteredGroupedAttendances = searchTerm.trim() === '' 
    ? groupedAttendances 
    : Object.entries(groupedAttendances).reduce((acc: GroupedAttendance, [date, attendances]) => {
        const filtered = attendances.filter(attendance => 
          attendance.names.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attendance.register_type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[date] = filtered;
        }
        return acc;
      }, {});

  return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">Registros de Asistencia</h2>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            isLoading={isRefreshing}
            variant="secondary"
            icon={<RefreshCw className="h-5 w-5" />}
            className="w-full sm:w-auto"
          >
            Actualizar
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o tipo de registro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        {loading && !isRefreshing ? (
          <LoadingSpinner message="Cargando registros de asistencia..." />
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        ) : Object.keys(filteredGroupedAttendances).length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm.trim() !== '' ? 
              'No se encontraron registros que coincidan con su búsqueda.' : 
              'No hay registros de asistencia disponibles.'}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(filteredGroupedAttendances)
              .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
              .map(([date, attendances]) => (
                <div key={date} className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="bg-blue-50 p-3 flex items-center border-b border-gray-200">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-medium text-blue-800">{formatDate(date)}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {attendances.map((attendance) => (
                      <div key={attendance.id} className="p-4 hover:bg-gray-50">
                        <div>
                          <span className="font-medium text-gray-800">{attendance.names}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-1 gap-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-gray-500 text-sm">{formatTime(attendance.date_time)}</span>
                            <span
                              className={`ml-2 px-2 py-0.5 text-xs rounded-full font-semibold ${
                                REGISTER_TYPE_STYLES[attendance.register_type as keyof typeof REGISTER_TYPE_STYLES]
                              }`}
                            >
                              {attendance.register_type.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <button
                            onClick={() => openInGoogleMaps(attendance.location)}
                            className="flex items-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors w-full sm:w-auto justify-center"
                          >
                            <MapPin className="h-4 w-4 mr-1" />
                            Ver ubicación
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
    </div>
  );
}

export default AttendanceList;
