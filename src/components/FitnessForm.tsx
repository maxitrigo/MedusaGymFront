import { useState } from "react";
import { asignarNivel } from "../helpers/AsignarNivel";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function FitnessForm() {

    const [isOpen, setIsOpen] = useState({
        form: false,
        arrow: <MdKeyboardArrowRight />
    });

    const [formData, setFormData] = useState({
        carrera: '',
        lagartijas: '',
        sentadillas: '',
        burpees: '',
    });

    const formValues = [
        {   
            name: "carrera",
            label: "Carrera"
        },
        {
            name: "lagartijas",
            label: "Lagartijas"
        },
        {
            name: "sentadillas",
            label: "Sentadillas"
        },
        {
            name: "burpees",
            label: "Burpees"
        }
    ];

    const handleIsOpen = () => {
        setIsOpen({
            form: !isOpen.form,
            arrow: isOpen.form ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const points = calculatePoints(formData);
        sessionStorage.setItem('points', points.toString());
    };

    const calculatePoints = (formData: any) => {
        let points = 0;
        const carrera = Number(formData.carrera);
        const lagartijas = Number(formData.lagartijas);
        const sentadillas = Number(formData.sentadillas);
        const burpees = Number(formData.burpees);
        const carreraPoints = carrera / 10;
        const lagartijasPoints = lagartijas;
        const sentadillasPoints = sentadillas;
        const burpeesPoints = burpees;
        const totalPoints = carreraPoints + lagartijasPoints + sentadillasPoints + burpeesPoints;
        points = totalPoints;
        return points;
    };

    return (
        <div className="flex flex-col bg-white items-center space-y-4 rounded-3xl w-full px-4 py-3">
            <div 
                onClick={handleIsOpen} 
                className="flex items-center justify-between w-full cursor-pointer bg-white rounded-4xl ">
                <h2 className="text-lg">Evaluación de Nivel</h2>
                <div className="text-2xl">
                    {isOpen.arrow}
                </div>
            </div>
            {isOpen.form && (
                <div className="flex flex-col bg-white items-center space-y-4 rounded-4xl w-full p-2 ">
                    <div className="border-t pt-2">
                        <p className="text-md font-bold">
                            Objetivo
                        </p>
                        <p className="text-md">
                            El objetivo de este test es medir tu capacidad física en cuatro ejercicios clave: carrera, lagartijas, sentadillas y burpees.
                        </p>
                        <p>
                            Según tus resultados en cada ejercicio, se calculará tu puntuación total y se te asignará un nivel de habilidad, junto con un subnivel dentro de ese nivel.
                        </p>
                        <p className="text-md">
                            El test consiste en realizar 4 ejercicios durante un total de 40 minutos, dando tu máximo potencial durante 10 minutos por cada ejercicio.
                        </p>
                        <p className="text-md font-bold mt-2 border-t pt-2">
                            Ingreso de datos:
                        </p>
                        <p className="font-bold">Carrera:</p>
                        <p>Introduce la distancia en metros ej: 1Km = 1000</p>
                        <p className="font-bold">Lagartijas y Burpees:</p>
                        <p>Introduce la cantidad de repeticiones que lograste en los 10 minutos ej: 50</p>
                        <p className="font-bold">Sentadillas:</p>
                        <p>Con 20kg de peso completa la mayor cantidad de repeticiones en 10 minutos, ej: 50</p>
                        <p className="text-md font-bold mt-2 border-t pt-2 border-b pb-2">
                            Para completar el test vas a precisar cronometrar tu tiempo y contar repeticiones.
                        </p>
                    </div>
                    {formValues.map((formValue, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <label className="font-bold ">{formValue.label}</label>
                            <input 
                                name={formValue.name} 
                                className="border border-gray-400 px-4 py-2 rounded-2xl outline-none" 
                                title={formValue.label} 
                                type="number" 
                                onChange={handleChange} 
                            />
                        </div>
                    ))}
                    <button 
                        onClick={handleSubmit} 
                        className="bg-black text-white font-bold px-4 py-2 rounded-4xl">
                        Guardar
                    </button>
                </div>
            )}
        </div>
    );
}
