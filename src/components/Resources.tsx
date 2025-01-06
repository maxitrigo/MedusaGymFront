import { useEffect, useState } from 'react';
import { createReservationResource, fetchReservationResources } from '../helpers/DataRequests';

interface Resource {
  id: string;
  name: string;
  userId: string;
  capacity: number;
  visible: boolean;
  days: string[];
  startTime: string;
  endTime: string;
  interval:number;
  duration:number;
}

const ResourcesComponent: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [newResource, setNewResource] = useState<Omit<Resource, 'id' | 'reservations'>>({
    name: '',
    userId: '',
    capacity: 0,
    visible: true,
    days: [],
    startTime: '',
    endTime: '',
    interval:0,
    duration:0
  });

  const handleDelete = async () => {

  }

  const fetchResources = async () => {
    try {
      const response = await fetchReservationResources();
      setResources(response || []);
    } catch (error) {
      console.error('Error al obtener los recursos:', error);
    }
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log(newResource);
      await createReservationResource(newResource);
      setNewResource({
        name: '',
        userId: '',
        capacity: 0,
        visible: true,
        days: [],
        startTime: '',
        endTime: '',
        interval: 0,
        duration: 0,
      });
      fetchResources();
    } catch (error) {
      console.error('Error al crear el recurso:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value, 10) : value,
    }));
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setNewResource((prev) => ({
      ...prev,
      days: checked ? [...prev.days, value] : prev.days.filter((day) => day !== value),
    }));
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="max-w-full px-4 py-6 bg-zinc-900 text-zinc-300 overflow-x-hidden">
      <h1 className="text-center text-2xl font-bold mb-6">Crea tus Clases</h1>
      <form onSubmit={handleCreateResource} className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block font-medium mb-1">Nombre:</label>
          <input
            type="text"
            name="name"
            value={newResource.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-3xl focus:outline-none focus:ring focus:ring-[#e8ff21]"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Capacidad:</label>
          <input
            type="number"
            name="capacity"
            value={newResource.capacity}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-3xl focus:outline-none focus:ring focus:ring-[#e8ff21]"
          />
        </div>
        <div>
        <label className="block font-medium mb-1">Visible:</label>
        <div className="flex items-center gap-2">
            <input
            type="checkbox"
            name="visible"
            checked={newResource.visible}
            onChange={(e) =>
                setNewResource((prev) => ({
                ...prev,
                visible: e.target.checked,
                }))
            }
            className="rounded-3xl border-zinc-700 text-[#e8ff21] focus:ring focus:ring-[#e8ff21]"
            />
            <span>{newResource.visible ? 'Sí' : 'No'}</span>
        </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Días:</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={day}
                  checked={newResource.days.includes(day)}
                  onChange={handleDaysChange}
                  className="rounded-3xl border-zinc-700 text-[#e8ff21] focus:ring focus:ring-[#e8ff21]"
                />
                {day}
              </label>
            ))}
          </div>
        </div>
        <div>
            <label>Ingresa en minutos el intervalo entre clase y clase</label>
            <input
                type='number'
                name='interval'
                value={newResource.interval}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-3xl focus:outline-none focus:ring focus:ring-[#e8ff21]"
            />
        </div>
        <div>
            <label>Ingresa en minutos la duracion de cada clase</label>
            <input
                type='number'
                name='duration'
                value={newResource.duration}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-3xl focus:outline-none focus:ring focus:ring-[#e8ff21]"
            />
        </div>
        <div>
            <p>Selecciona el horario de disponibilidad de la clase</p>
        </div>
        <div>
          <label className="block font-medium mb-1">Hora de Inicio:</label>
          <input
            type="text"
            name="startTime"
            placeholder='08:00'
            value={newResource.startTime}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-3xl focus:outline-none focus:ring focus:ring-[#e8ff21]"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Hora de Fin:</label>
          <input
            type="text"
            name="endTime"
            placeholder='23:00'
            value={newResource.endTime}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-3xl focus:outline-none focus:ring focus:ring-[#e8ff21]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-[#e8ff21] text-black font-medium rounded-3xl hover:bg-[#d6e31e] transition"
        >
          Crear Recurso
        </button>
      </form>

      <h2 className="text-center text-xl font-semibold mt-8">Lista de Clases</h2>
    <div className='overflow-x-scroll'>
      <table className="w-full mt-4 text-left border-collapse">
        <thead>
          <tr className="bg-zinc-800">
            <th className="px-3 py-2 border-b border-zinc-700">Nombre</th>
            <th className="px-3 py-2 border-b border-zinc-700">Capacidad</th>
            <th className="px-3 py-2 border-b border-zinc-700">Visible</th>
            <th className="px-3 py-2 border-b border-zinc-700">Días</th>
            <th className="px-3 py-2 border-b border-zinc-700">Inicio</th>
            <th className="px-3 py-2 border-b border-zinc-700">Fin</th>
            <th className="px-3 py-2 border-b border-zinc-700">Duracion</th>
            <th className="px-3 py-2 border-b border-zinc-700"></th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id} className="hover:bg-zinc-800">
              <td className="px-3 py-2 border-b border-zinc-700">{resource.name}</td>
              <td className="px-3 py-2 border-b border-zinc-700">{resource.capacity}</td>
              <td className="px-3 py-2 border-b border-zinc-700">{resource.visible ? 'Sí' : 'No'}</td>
              <td className="px-3 py-2 border-b border-zinc-700">{resource.days.join(', ')}</td>
              <td className="px-3 py-2 border-b border-zinc-700">{resource.startTime}</td>
              <td className="px-3 py-2 border-b border-zinc-700">{resource.endTime}</td>
              <td className="px-3 py-2 border-b border-zinc-700">{resource.duration}</td>
              <td className="px-3 py-2 border-b border-zinc-700"><button onClick={handleDelete} className='font-bold bg-red-500 px-4 py-2 rounded-3xl clickable'>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ResourcesComponent;
