import { useEffect, useState } from "react";
import { createGym, fetchGyms } from "../../helpers/DataRequests";
import { useNavigate } from "react-router-dom";

export default function CreateGym() {
    const [slug, setSlug] = useState('');
    const [gyms, setGyms] = useState<string[]>([]);
    const [slugTaken, setSlugTaken] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formError, setFormError] = useState(false);
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
            const gymsData = await fetchGyms();
            setGyms(gymsData.map((gym: { slug: string }) => gym.slug));
        };
        loadGyms();
    }, []);

    const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputSlug = event.target.value;

        // Eliminar espacios y caracteres no permitidos
        inputSlug = inputSlug.replace(/\s+/g, '-').toLowerCase();

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
            [name]: value.trim()
        });
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const formattedValue = value.replace(/[^0-9]/g, '').slice(0, 4);

        if (formattedValue.length === 4) {
            const formattedTime = `${formattedValue.slice(0, 2)}:${formattedValue.slice(2, 4)}`;
            setFormData({
                ...formData,
                [name]: formattedTime
            });
        } else {
            setFormData({
                ...formData,
                [name]: formattedValue
            });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validar que todos los campos estén completos
        const allFieldsFilled = Object.values(formData).every(value => value !== '') && slug !== '';

        if (!allFieldsFilled || slugTaken) {
            setFormError(true);
            return;
        }

        setFormError(false);

        const allData = { ...formData, slug };
        try {
            await createGym(allData);
            alert ('Gimnasio creado!, logueate nuevamente para acceder a el!')
            navigate(`/${slug}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl m-auto text-center p-4">
            <div onClick={() => setIsOpen(!isOpen)} className="horizontal-center m-4 p-2 rounded-3xl font-bold">
                <h1 className="text-4xl font-black text-zinc-200 italic">Crea tu GYM</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-2">
                <label className="flex text-white font-semibold px-2">gym.com/{slug}</label>
                <input 
                    onChange={handleSlugChange} 
                    value={slug} 
                    type="text" 
                    placeholder="URL" 
                    className="principal-input" 
                />
                {slugTaken ? (
                    <p className="text-red-500 text-sm px-4">Url ya registrada.</p>
                ) : (
                    <p className="flex text-green-300 text-sm px-4">Url libre</p>
                )}

                <label className="flex text-white font-semibold px-2">Nombre del Gym</label>
                <input 
                    name="name" 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Nombre" 
                    className="principal-input" 
                />

                <label className="flex text-white font-semibold px-2">Direccion</label>
                <input 
                    name="address" 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Direccion" 
                    className="principal-input" 
                />

                <label className="flex text-white font-semibold px-2">Telefono</label>
                <input 
                    name="phone" 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Telefono" 
                    className="principal-input" 
                />

                <label className="flex text-white font-semibold px-2">Correo</label>
                <input 
                    name="email" 
                    onChange={handleChange} 
                    type="email" 
                    placeholder="Correo" 
                    className="principal-input" 
                />

                <label className="flex text-white font-semibold px-2">Horario de Apertura</label>
                <input 
                    name="openHours" 
                    onChange={handleTimeChange} 
                    value={formData.openHours} 
                    type="text" 
                    placeholder="Horario de Apertura formato 08:00" 
                    className="principal-input" 
                />

                <label className="flex text-white font-semibold px-2">Horario de Cierre</label>
                <input 
                    name="closeHours" 
                    onChange={handleTimeChange} 
                    value={formData.closeHours} 
                    type="text" 
                    placeholder="Horario de Cierre formato 22:00" 
                    className="principal-input" 
                />

                {formError && (
                    <p className="text-red-500 text-sm px-4">Por favor, completa todos los campos correctamente.</p>
                )}

                <div>
                    <button 
                        type="submit" 
                        className="bg-[#e4ff00] mt-8 w-1/2 font-bold py-2 px-4 rounded-3xl transition-transform transform active:scale-95">
                        Crear
                    </button>
                </div>
            </form>
        </div>
    );
}
