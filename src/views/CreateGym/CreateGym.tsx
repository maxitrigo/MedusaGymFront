import { useEffect, useState } from "react";
import { createGym, fetchGyms } from "../../helpers/DataRequests";
import { useNavigate } from "react-router-dom";

export default function CreateGym() {
    const [slug, setSlug] = useState('');
    const [gyms, setGyms] = useState<string[]>([]);
    const [slugTaken, setSlugTaken] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        openHours: '',
        closeHours: ''
    });

    useEffect(() => {
        const loadGyms = async () => {
            const gymsData = await fetchGyms()
            setGyms(gymsData.map((gym: { slug: string }) => gym.slug));
        }
        loadGyms();
    }, []);

    const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputSlug = event.target.value;
        setSlug(inputSlug);
        
        
        // Verificar si el slug ya está tomado
        if (gyms.includes(inputSlug)) {
          setSlugTaken(true);
        } else {
          setSlugTaken(false);
        }
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const allData = { ...formData, slug };
        try{
            await createGym(allData);
            navigate(`/${slug}/home`);
        } catch (error) {
            console.error(error);
        }

    };
    
    return (
        <div className="flex flex-col items-center h-screen w-screen p-2 overflow-y-auto mb-4">
            <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center m-4 bg-principal w-full p-2 rounded-3xl font-bold transition-transform transform active:scale-95 cursor-pointer">
            <h1>Crea tu Gimnasio</h1>
            </div>
            {isOpen &&
            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
                <label className="text-white font-semibold px-2">gym.com/{slug}</label>
                <input onChange={handleSlugChange} value={slug} type="text" placeholder="URL" className="principal-input" />  {slugTaken ? <p className="text-red-500 text-sm px-4">Url ya registrada.</p> : <p className="text-green-300 text-sm px-4">Url libre</p>}

                <label className="text-white font-semibold px-2">Nombre del Gym</label>
                <input name="name" onChange={handleChange} type="text" placeholder="Nombre" className="principal-input" />

                <label  className="text-white font-semibold px-2">Direccion</label>
                <input name="address" onChange={handleChange} type="text" placeholder="Direccion" className="principal-input" />

                <label className="text-white font-semibold px-2">Telefono</label>
                <input name="phone" onChange={handleChange} type="text" placeholder="Telefono" className="principal-input" />

                <label className="text-white font-semibold px-2">Correo</label>
                <input name="email" onChange={handleChange} type="email" placeholder="Correo" className="principal-input" />

                <button type="submit" className="bg-principal text-white font-bold py-2 px-4 rounded-3xl transition-transform transform active:scale-95">Crear</button>
            </form>
}
        </div>
    );
}