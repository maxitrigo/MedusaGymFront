import { useEffect, useState } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { communicationsDelete, communicationsGet, communicationsPost } from "../helpers/DataRequests";

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

  const [isOpen, setIsOpen] = useState({
    form: false,
    arrow: <MdKeyboardArrowRight />
  });

  const [communications, setCommunications] = useState<Communication[]>([]);

  useEffect(() => {
    const gymId = sessionStorage.getItem('gymId');
    if (gymId) {
      communicationsGet(gymId).then(data => setCommunications(data));
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
    console.log(formData);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    communicationsPost(formData);
    window.location.reload();
  };

  const handleDelete = (communicationId: string) => {
    console.log(communicationId);
    // Aquí puedes hacer la llamada a la API para eliminar el comunicado
    communicationsDelete(communicationId);
    window.location.reload();
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex flex-col bg-white space-y-4 rounded-3xl w-full px-4 py-3 mt-4">
        <div className="flex justify-between items-center text-lg" onClick={handleIsOpen}>
          <h1>Crear comunicado</h1>
          <div className="text-2xl">
            {isOpen.arrow}
          </div>
        </div>            
        {isOpen.form && (
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
            <input onChange={handleChange} name="title" className="w-full border px-4 py-2 rounded-4xl outline-none" placeholder="Titulo" type="text" />
            <textarea onChange={handleChange} name="message" id="message" className="w-full border px-6 py-6 rounded-4xl outline-none" placeholder="Mensaje" rows={7}></textarea>
            <button className="bg-black text-white rounded-4xl px-4 py-2 font-bold"> Crear </button>
          </form>
        )}
      </div>
      <div className="flex flex-col items-center bg-white rounded-3xl py-3 space-y-4">
        <div className="flex justify-between w-full px-4 py-2 items-center">
          <h1>Comunicados creados</h1>
          <HiOutlineBellAlert className="text-2xl text-yellow-600"/>
        </div>{communications.length === 0 && <p className="border-t pt-2 w-full text-center p-2">No hay comunicados</p>}
        {communications.map((communication) => (
          <div id={communication.id} key={communication.id} className="flex flex-col px-6 space-y-2 w-full">
            <h2 className="font-bold border-t pt-2">{communication.title}</h2>
            <p>{communication.message}</p>
            <p>{(communication.createdAt).split('T')[0]}</p>
            <div className="flex flex-col justify-center">
              <button onClick={() => handleDelete(communication.id)} className="bg-red-500 text-white rounded-4xl px-4 py-2 font-bold">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
