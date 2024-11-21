import { useEffect, useState } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { communicationsGet } from "../helpers/DataRequests";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]); // Especifica el tipo como un array
  const defaultMessages = [
    { id: 'default', title: 'Sin anuncios', message: 'No hay anuncios disponibles.', createdAt: '' },
  ];

  useEffect(() => {
    const gymToken = sessionStorage.getItem("gymToken");
    if (gymToken) {
      communicationsGet(gymToken).then((data) => setAnnouncements(data));
    }
  }, []);

  // Si no hay anuncios, usa los mensajes por defecto
  const displayedAnnouncements = announcements.length > 0 ? announcements : defaultMessages;

  return (
    <div className="bg-zinc-100 rounded-4xl p-4 font-nunito h-full">
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-bold mb-2">Cartelera de Comunicados</h2>
        </div>
        <div className="text-yellow-600 text-3xl">
          <HiOutlineBellAlert />
        </div>
      </div>

      <ul>
        {displayedAnnouncements.map((announcement) => (
          <li key={announcement.id} className="border-t border-neutral-300 py-2">
            <h3 className="text-md font-bold">{announcement.title}</h3>
            <p className="text-md">{announcement.message}</p>
            {announcement.createdAt && (
              <p className="text-xs">{announcement.createdAt.split("T")[0]}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;

