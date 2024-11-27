import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { deletePlan, getPlans } from "../helpers/DataRequests";

export const CreatedPlans = () => {
    const [isOpen, setIsOpen] = useState({ form: false, arrow: <MdKeyboardArrowRight /> });
    const [plans, setPlans] = useState([]);

    const handleIsOpen = async () => {
        setIsOpen({
            form: !isOpen.form,
            arrow: isOpen.form ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />
        });
        if (!isOpen.form) {
            const createdPlans = await getPlans();
            setPlans(createdPlans);
        }
    };

    const handleDelete = async (planId: string) => {
        const response = await deletePlan(planId);
        if (response) {
            window.location.reload();
        }
    }
    
    return (
        <div className="container-principal cursor-pointer">
            <div onClick={handleIsOpen} className="horizontal-between">
                <h1>Membresias Activas</h1>
                <p className="text-2xl">{isOpen.arrow}</p>
            </div>
            {isOpen.form && plans.map((plan: any) => (
                <div key={plan.id} className="border-t border-zinc-800 font-normal py-2">
                    <div className="flex justify-between">
                        <p>Nombre:</p>
                        <p>{plan.name}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Descripción:</p>
                        <p className="text-right">{plan.description}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Precio:</p>
                        <p>${plan.price}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Duracion:</p>
                        <p>{plan.duration} dias</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Cantidad de ingresos:</p>
                        <p>{plan.admissions}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Pase Libre:</p>
                        <p>{plan.freePass ? "Si" : "No"}</p>
                    </div>
                    <div className="vertical-center">
                    <button onClick={() => handleDelete(plan.id)} className="button-delete">Eliminar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};
