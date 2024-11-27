import { useEffect, useState } from "react"
import { NavBar } from "../../components/NavBar"
import { createPayment, getPlans } from "../../helpers/DataRequests"
import { IoTicketSharp } from "react-icons/io5";
import { AdmissionsCard } from "../../components/AdmissionsCard";

export default function Plans() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const getPlansData = async () => {
            // Verificar si ya hay planes almacenados en sessionStorage
            const storedPlans = sessionStorage.getItem("plansData");

            if (storedPlans) {
                // Si los planes están en sessionStorage, los usamos
                setPlans(JSON.parse(storedPlans));
            } else {
                // Si no están almacenados, los obtenemos y guardamos en sessionStorage
                const plansData = await getPlans();
                setPlans(plansData);
                sessionStorage.setItem("plansData", JSON.stringify(plansData));
            }
        }

        getPlansData();
    }, []);

    const handleClick = async (id: string, title: string, price: number, description: string) => {
        const productData = {
            id: id,
            title: title,
            price: price,
            description: description
        }
        const response = await createPayment(productData);
        window.location.href = response.init_point;
    }

    return (
        <div className="flex flex-col items-center justify-center text-center h-full p-2 overflow-y-auto pb-24">
            <NavBar />
            <div>
                <div>
                    <AdmissionsCard/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
                    {plans.map((plan: any) => (
                        <div key={plan.id} className="suscription-card vertical-between ">
                            <div className="horizontal-between px-2 pl-6 text-center verde-pastel w-full h-16 rounded-4xl">
                                <p className="font-bold text-black">
                                    Suscripciones
                                </p>
                                <div className="bg-background rounded-full p-2">
                                    <IoTicketSharp />
                                </div>
                            </div>
                            <div className="vertical-between h-full">
                                <div className="text-3xl font-bold vertical-center text-center">
                                    <p>{plan.name}</p>
                                </div>
                                <div className="font-bold text-lg vertical-center text-center">
                                    <p>{plan.description}</p>
                                    <p className="text-sm">Duracion: {plan.duration} dias</p>
                                </div>
                                <div className="font-bold text-2xl mb-4 vertical-center text-center">
                                    ${plan.price}
                                </div>
                            </div>
                            <div className="vertical-center text-center">
                                <button onClick={() => handleClick(plan.id, plan.name, plan.price, plan.description)} className="button-primary shadow-xl">Comprar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
