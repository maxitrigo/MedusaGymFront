import { useState, useEffect } from 'react';
import { createReservation, fetchReservationResources } from '../helpers/DataRequests'; // O el helper correspondiente
import { fetchAvailableTimes } from '../helpers/DataRequests'; // Nueva función
import { useSelector } from 'react-redux';

interface Resource {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  interval: number;
  visible: boolean;
  capacity: number;
}

const ReserveComponent: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [availableTimes, setAvailableTimes] = useState<{ [key: string]: string[] }>({}); // Almacena los horarios disponibles por día
  const [selectedTime, setSelectedTime] = useState<{ day: string; time: string } | null>(null);
  const [resourceInterval, setResourceInterval] = useState(0);
  const role = useSelector((state: any) => state.user.role);

  // Función para obtener el día actual
  const getTodayDayName = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const today = new Date();
    return days[today.getDay()];
  };

  // Función para filtrar días pasados
  const filterPastDays = (weekDays: string[]) => {
    const daysOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const todayIndex = daysOrder.indexOf(getTodayDayName());
    return weekDays.filter((day) => daysOrder.indexOf(day) >= todayIndex);
  };

  // Función para generar los horarios posibles en base a startTime, endTime e interval
  const generateAllTimes = (startTime: string, endTime: string, interval: number) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const allTimes: string[] = [];

    while (start < end) {
      allTimes.push(start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      start.setMinutes(start.getMinutes() + interval);
    }

    return allTimes;
  };

  const fetchResources = async () => {
    try {
      const response = await fetchReservationResources();
      let array: any = [];
      response.map((resource: any) => {
        if (resource.visible === true) {
          array.push(resource);
        }
        return array;
      });
      setResources(array || []);
    } catch (error) {
      console.error('Error al obtener los recursos:', error);
    }
  };

  // Llamada a la API para obtener los horarios disponibles
  const fetchAvailableResourceTimes = async (resourceId: string, weekDays: string[], capacity: number) => {
    try {
      const times = await fetchAvailableTimes(resourceId, weekDays, capacity);

      const timesByDay: { [key: string]: string[] } = {};
      let allTimes: string[] = [];

      if (selectedResource) {
        allTimes = generateAllTimes(selectedResource.startTime, selectedResource.endTime, resourceInterval);
      }

      times.forEach((item: { day: string, times: string[] }) => {
        timesByDay[item.day] = item.times;
      });

      weekDays.forEach(day => {
        const isToday = day === getTodayDayName(); // Verifica si el día mapeado es el día actual
        const now = new Date();
        const currentTime = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // Hora local en HH:mm
      
        if (!timesByDay[day] || timesByDay[day].length === 0) {
          // Si no hay horarios disponibles o están vacíos
          timesByDay[day] = isToday
            ? allTimes.filter(time => time >= currentTime) // Filtra horarios mayores o iguales a la hora actual
            : allTimes; // Si no es hoy, asigna todos los horarios posibles
        } else {
          // Si ya existen horarios, filtra ocupados y los que ya pasaron en caso de ser hoy
          timesByDay[day] = allTimes.filter(time => 
            !timesByDay[day].includes(time) && (!isToday || time >= currentTime)
          );
        }
      });

      setAvailableTimes(timesByDay);
    } catch (error) {
      console.error('Error al obtener los horarios disponibles:', error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (selectedResource) {
      const filteredDays = filterPastDays(selectedResource.days);
      fetchAvailableResourceTimes(selectedResource.id, filteredDays, selectedResource.capacity);
    }
  }, [selectedResource]);

  const handleResourceSelect = async (resource: Resource) => {
    setSelectedResource(resource);
    setResourceInterval(resource.interval);
    setSelectedTime(null);

    const filteredDays = filterPastDays(resource.days);
    await fetchAvailableResourceTimes(resource.id, filteredDays, resource.capacity);
  };

  const handleTimeSelect = (day: string, time: string) => {
    setSelectedTime({ day, time });
  };

  const calculateDateFromDay = (day: string): string => {
    const daysOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const today = new Date();
    const todayIndex = today.getDay();
    const targetIndex = daysOrder.indexOf(day);
  
    const difference = targetIndex >= todayIndex ? targetIndex - todayIndex : 7 - (todayIndex - targetIndex);
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + difference);
  
    return targetDate.toISOString().split('T')[0]; // Retorna solo la fecha en formato 'YYYY-MM-DD'
  };

  const handleReserve = async () => {
    if (role === 'admin') {
      return alert('No puedes reservar clases desde una cuenta de administrador');
    }
    if (selectedResource && selectedTime) {
        const dayDate = calculateDateFromDay(selectedTime.day)
      const reservationData = {
        resourceId: selectedResource.id,
        day: selectedTime.day,
        time: selectedTime.time,
        date: dayDate
      };

      try {
        await createReservation(reservationData);
        alert('Reserva creada exitosamente!');
        window.location.reload()
        // console.log('Detalles de la reserva:', response);
      } catch (error) {
        console.error('Error al crear la reserva:', error);
        alert('Hubo un error al crear la reserva.');
      }
    } else {
      alert('Por favor selecciona un recurso y un horario.');
    }
  };

  return (
    <div className="max-w-full px-4 py-6 text-zinc-300">
      {role === 'admin' && (
        <div className="text-zinc-500">
          <p>Preview del modulo reservas</p>
        </div>
      )}
      <h1 className="text-center text-2xl font-bold mb-6">Reserva tu Clase</h1>

      {/* Mostrar recursos */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold pb-2">Selecciona una clase</h2>
        <ul className="space-y-4">
          {resources.map((resource) => (
            <li
              key={resource.id}
              onClick={() => handleResourceSelect(resource)}
              className="cursor-pointer hover:bg-zinc-700 bg-zinc-900 p-2 rounded-2xl"
            >
              {resource.name} | Disponibilidad: {resource.startTime} a {resource.endTime}
            </li>
          ))}
        </ul>
      </div>

      {/* Mostrar tabla de horarios cuando un recurso es seleccionado */}
      {selectedResource && (
        <div className="items-center">
          <h3 className="text-xl font-semibold">Disponibilidad de {selectedResource.name}</h3>
          <div className="mt-4 grid grid-cols-3 sm:flex sm:justify-center gap-2">
            {filterPastDays(selectedResource.days).map((day) => (
              <div key={day} className="flex flex-col items-center">
                <h4 className="font-bold pb-2">{day}</h4>
                <div className="space-y-1">
                  {availableTimes[day]?.map((time) => (
                    <button
                      key={`${day}-${time}`}
                      onClick={() => handleTimeSelect(day, time)}
                      className={`text-sm w-full py-2 rounded-3xl ${
                        selectedTime?.day === day && selectedTime?.time === time ? 'text-black bg-[#e8ff21]' : 'bg-zinc-900'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mostrar el botón de reserva */}
      {selectedTime && (
        <div className="mt-6 text-center">
          <button
            onClick={handleReserve}
            className="py-2 px-6 bg-[#e8ff21] text-black font-medium rounded-3xl hover:bg-[#d6e31e]"
          >
            Confirmar Reserva
          </button>
        </div>
      )}
    </div>
  );
};

export default ReserveComponent;
