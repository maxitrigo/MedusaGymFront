import { IoAlertCircleOutline } from "react-icons/io5";
import { HiOutlineBellAlert } from "react-icons/hi2";

interface Announcement {
    id: number;
    title: string;
    message: string;
    date: string;
  }
  
  const announcements: Announcement[] = [
    // Ejemplo de datos de anuncios. Si no hay anuncios, este array debería estar vacío.
    { id: 1, title: 'Cerrado por reforma', message: 'Comenzando el 10/02/2025 el gimnasio permanecera cerrado por aproximadamente 2 semanas, mientras terminamos las obras de refaccion del piso.', date: '2024-11-01' },
    { id: 2, title: 'Descuento de 10%', message: 'Todo el mes de Diciembre, el gimnasio ofrece un descuento del 10% en todos los servicios.', date: '2024-11-01' },
  ];
  
  const Announcements: React.FC = () => {
    // Solo se muestra el componente si hay anuncios
    if (announcements.length === 0) return null;
  
    return (
      <div className="bg-white rounded-4xl p-4 mt-4 font-nunito">
        <div className="flex justify-between">
            <div>
                <h2 className="text-lg font-bold mb-2">Cartelera de Comunicados</h2>
            </div>
            <div className="text-yellow-600 text-3xl">
                {/* <IoAlertCircleOutline /> */}
                <HiOutlineBellAlert />
            </div>
        </div>


        <ul>
          {announcements.map((announcement) => (
            <li key={announcement.id} className="border-b border-neutral-300 py-2">
              <h3 className="text-md font-bold">{announcement.title}</h3>
              <p className="text-md">{announcement.message}</p>
              <p className="text-xs">{announcement.date}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Announcements;