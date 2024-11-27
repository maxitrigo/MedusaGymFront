import { useEffect, useState } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { communicationsGet } from "../helpers/DataRequests";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]); // Especifica el tipo como un array
  const defaultMessages = [
    { id: 'default', title: 'Sin anuncios', message: 'No hay anuncios disponibles.', createdAt: '' },
  ];

  useEffect(() => {
    const storedAnnouncements = sessionStorage.getItem("announcements");

    if (storedAnnouncements) {
      // Si ya existen anuncios en sessionStorage, los carga directamente
      setAnnouncements(JSON.parse(storedAnnouncements));
    } else {
      const gymToken = sessionStorage.getItem("gymToken");
      if (gymToken) {
        communicationsGet(gymToken).then((data) => {
          setAnnouncements(data);
          // Guarda los anuncios en sessionStorage para futuros usos durante la sesión
          sessionStorage.setItem("announcements", JSON.stringify(data));
        });
      }
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  // Si no hay anuncios, usa los mensajes por defecto
  const displayedAnnouncements = announcements.length > 0 ? announcements : defaultMessages;

  return (
    <div className="bg-zinc-900 rounded-4xl p-4 font-nunito h-full">
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-bold mb-2 text-white">Cartelera de Comunicados</h2>
        </div>
        <div className="text-yellow-400 text-3xl">
          <HiOutlineBellAlert />
        </div>
      </div>

      <ul>
        {displayedAnnouncements.map((announcement) => (
          <li key={announcement.id} className="border-t border-zinc-800 py-2">
            <h3 className="text-md font-bold text-white">{announcement.title}</h3>
            <p className="text-md text-white">{announcement.message}</p>
            {announcement.createdAt && (
              <p className="text-xs text-white">{announcement.createdAt.split("T")[0]}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
