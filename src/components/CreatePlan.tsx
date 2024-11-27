import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { createPlan } from "../helpers/DataRequests";

export const CreatePlan = () => {
    const [isOpen, setIsOpen] = useState({ form: false, arrow: <MdKeyboardArrowRight /> })

    const handleIsOpen = () => {
        setIsOpen({
            form: !isOpen.form,
            arrow: isOpen.form ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />
        });
    };

    const CreatePlan = [
        {
            name: 'name',
            label: 'Nombre',
            placeholder: 'Ingrese el nombre del plan',
            type: 'text'
        },
        {
            name: 'description',
            label: 'Descripción',
            placeholder: 'Ingrese la descripción del plan',
            type: 'text'
        },
        {
            name: 'price',
            label: 'Precio',
            placeholder: 'Ingrese el precio del plan',
            type: 'number'
        },
        {
            name: 'duration',
            label: 'Duración',
            placeholder: 'Ingrese la duración del plan en dias',
            type: 'number'
        },
        {
            name: 'freePass',
            label: 'Pase Libre',
            type: 'checkbox'
        },
        {
            name: 'admissions',
            label: 'Ingresos',
            placeholder: 'Ingrese el numero de clases',
            type: 'number'
        }
    ]

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        duration: 0,
        freePass: false,
        admissions: 0
    })

    const handleChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await createPlan(formData);
        if (response.status === 201) {
            console.log('Plan creado exitosamente');
        }
        formData.name = '';
        formData.description = '';
        formData.price = 0;
        formData.duration = 0;
        formData.freePass = false;
        formData.admissions = 0;
        window.location.reload();
    }


    return (
        <div className="container-principal">
            <div onClick={handleIsOpen} className="horizontal-between cursor-pointer">
                <h1>Crear Membresia</h1>
                <p className="text-2xl">{isOpen.arrow}</p>
            </div>
            {isOpen.form && 
            <div className="vertical-center w-full space-y-4">
                {CreatePlan.map((item, index) => (
                    <div className="vertical-center w-full" key={index}>
                        <label className="font-bold">{item.label}</label>
                        <input onChange={handleChange} className="secondary-input text-center" type={item.type} placeholder={item.placeholder} name={item.name} />
                    </div>
                ))}
                <button onClick={handleSubmit} className="button-send">Crear Plan</button>
            </div>}
        </div>
    )
}