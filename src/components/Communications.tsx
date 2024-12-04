import { useEffect, useState } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { communicationsDelete, communicationsGet, communicationsPost } from "../helpers/DataRequests";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Communication {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export const Communications = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  });
  const gymSlug = useSelector((state: any) => state.gym.slug);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState({
    form: false,
    arrow: <MdKeyboardArrowRight />
  });

  const [communications, setCommunications] = useState<Communication[]>([]);

  useEffect(() => {
    const gymToken = sessionStorage.getItem('gymToken');
    if (gymToken) {
      try {
        communicationsGet(gymToken).then(data => setCommunications(data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
              // Maneja el error 401
              alert("No autorizado. Por favor, inicie sesión.");
              navigate(`/${gymSlug}`);
          } else {
              alert("Error al cargar los usuarios.");
          }
      } else {
          alert("Error desconocido.");
      }
      }
    } else {
      console.error('Gym ID no encontrado');
    }
  }, []);

  const handleIsOpen = () => {
    setIsOpen({
      form: !isOpen.form,
      arrow: isOpen.form ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    communicationsPost(formData);
    window.location.reload();
  };

  const handleDelete = (communicationId: string) => {
    communicationsDelete(communicationId);
    window.location.reload();
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="container-principal">
        <div className="horizontal-between text-lg cursor-pointer" onClick={handleIsOpen}>
          <h1>Crear comunicado</h1>
          <div className="text-2xl">
            {isOpen.arrow}
          </div>
        </div>
        {isOpen.form && (
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
            <input onChange={handleChange} name="title" className="secondary-input" placeholder="Titulo" type="text" />
            <textarea onChange={handleChange} name="message" id="message" className="secondary-input" placeholder="Mensaje" rows={7}></textarea>
            <button className="button-send"> Crear </button>
          </form>
        )}
      </div>
      <div className="container-principal">
        <div className="horizontal-between px-2 py-2">
          <h1>Comunicados creados</h1>
          <HiOutlineBellAlert className="text-2xl text-yellow-600"/>
        </div>{communications.length === 0 && <p className="border-t border-zinc-800 pt-2 w-full text-center p-2 text-zinc-400">No hay comunicados</p>}
        {communications.map((communication) => (
          <div id={communication.id} key={communication.id} className="flex flex-col px-6 space-y-2 w-full pb-2 font-normal">
            <h2 className="font-bold border-t border-zinc-800 pt-2">{communication.title}</h2>
            <p>{communication.message}</p>
            <p>{(communication.createdAt).split('T')[0]}</p>
            <div className="flex justify-center">
              <button onClick={() => handleDelete(communication.id)} className="button-delete mt-4">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
