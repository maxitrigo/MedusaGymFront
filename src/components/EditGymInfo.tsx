import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export const EditGymInfo = () => {
    const [isOpen, setIsOpen] = useState({ form: false, arrow: <MdKeyboardArrowRight /> })

    const handleIsOpen = () => {
        setIsOpen({
            form: !isOpen.form,
            arrow: isOpen.form ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />
        });
    };

    type FormData = {
        name: string;
        address: string;
        phone: string;
        email: string;
        openHours: string;
        closeHours: string;
    };

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        openHours: '',
        closeHours: ''
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formData);
    }

    const EditGymInfo = [
        {
            name: "name",
            label: "Nombre",
            placeholder: "Nombre del gimnasio"
        },
        {
            name: "address",
            label: "Dirección",
            placeholder: "Dirección del gimnasio"
        },
        {
            name: "phone",
            label: "Teléfono",
            placeholder: "Teléfono del gimnasio"
        },
        {
            name: "email",
            label: "Correo",
            placeholder: "Correo del gimnasio"
        },
        {
            name: "openHours",
            label: "Horario Apertura",
            placeholder: "Horario de apertura"
        },
        {
            name: "closeHours",
            label: "Horario de Cierre",
            placeholder: "Horario de cierre"
        }
    ]


    return (
        <div className="container-principal">
            <div className="horizontal-between text-lg" onClick={handleIsOpen}>
                <h2>Editar información del gimnasio</h2>
                <div className="text-2xl">
                    {isOpen.arrow}
                </div>
            </div>

            {isOpen.form && 
            <div className="container-principal">
                {EditGymInfo.map((info, index) => (
                    <div key={index} className="horizontal-center">
                        <p className="font-bold w-1/2">{info.label}:</p>
                        <input className="secondary-input w-1/2" type="text" name={info.name} placeholder={info.placeholder} value={formData[info.name as keyof FormData]} onChange={handleChange} />
                    </div>
                ))}
                <div className="flex justify-center">
                <button className="button-form-primary" type="submit" onClick={handleSubmit}>Guardar</button>
                </div>
            </div>
            }

        </div>
    )
};