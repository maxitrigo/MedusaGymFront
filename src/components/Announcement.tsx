import { useEffect, useState } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { communicationsGet } from "../helpers/DataRequests";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([])
    useEffect(() => {
        const gymId = sessionStorage.getItem('gymId');
        communicationsGet(gymId as string).then(data => setAnnouncements(data))
    },[])
  // Solo se muestra el componente si hay anuncios
  if (announcements.length === 0) return null;

  return (
    <div className="bg-white rounded-4xl p-4 mt-6 font-nunito">
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-bold mb-2">Cartelera de Comunicados</h2>
        </div>
        <div className="text-yellow-600 text-3xl">
          <HiOutlineBellAlert />
        </div>
      </div>

      <ul>
        {announcements.map((announcement: any) => (
          <li key={announcement.id} className="border-t border-neutral-300 py-2">
            <h3 className="text-md font-bold">{announcement.title}</h3>
            <p className="text-md">{announcement.message}</p>
            <p className="text-xs">{(announcement.createdAt).split('T')[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
