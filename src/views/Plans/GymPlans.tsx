import { useEffect, useState } from "react"
import { NavBar } from "../../components/NavBar"
import { createPayment, getGlobalPlans } from "../../helpers/DataRequests"
import { IoTicketSharp } from "react-icons/io5";

export default function GymPlans() {
    const [plans, setPlans] = useState<any[]>([]);  // Asegúrate de que sea un array vacío por defecto
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPlansData = async () => {
            try {
                // Verificar si ya hay planes almacenados en sessionStorage
                const storedPlans = sessionStorage.getItem("plansData");

                if (storedPlans) {
                    // Si los planes están en sessionStorage, los usamos
                    const parsedPlans = JSON.parse(storedPlans);
                    setPlans(Array.isArray(parsedPlans) ? parsedPlans : []);
                } else {
                    // Si no están almacenados, los obtenemos y guardamos en sessionStorage
                    const plansData = await getGlobalPlans();
                    setPlans(Array.isArray(plansData) ? plansData : []);  // Asegúrate de que sea un array
                    sessionStorage.setItem("plansData", JSON.stringify(plansData));
                }
            } catch (err) {
                setError("No se pudieron cargar los planes. Intenta de nuevo más tarde.");
            } finally {
                setLoading(false);
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

    if (loading) {
        return <div>Loading...</div>;  // Puedes mostrar un spinner o mensaje de carga aquí.
    }

    if (error) {
        return <div>{error}</div>;  // Mostrar un mensaje de error si no se cargaron los planes.
    }

    return (
        <div className="flex flex-col items-center justify-center text-center h-full p-2 overflow-y-auto pb-24">
            <NavBar />
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
                    {plans.length === 0 ? (
                        <div className="text-xl text-zinc-200">No hay planes disponibles en este momento.</div>  // Si no hay planes, mostrar esto.
                    ) : (
                        plans.map((plan: any) => (
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
                                        <p className="font-black italic">{plan.name}</p>
                                    </div>
                                    <div className="font-bold text-lg vertical-center text-center">
                                        <p>{plan.description}</p>
                                        <p className="text-sm">Duracion: {plan.duration} dias</p>
                                    </div>
                                    <div className="font-bold text-2xl mb-4 vertical-center text-center">
                                        ${plan.price}
                                    </div>
                                </div>
                                <div className="vertical-center text-center w-full">
                                    <button onClick={() => handleClick(plan.id, plan.name, plan.price, plan.description)} className="button-form-primary shadow-xl">Comprar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

