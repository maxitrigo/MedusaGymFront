import { useEffect, useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"
import { getPlans, updateSubscription, usersGet } from "../helpers/DataRequests"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export const ManualPlanAsignation = () => {
    const[isOpen, setIsOpen] = useState(false)
    const [users, setUsers] = useState([])
    const gymSlug = useSelector((state: any) => state.gym.slug);
    const navigate = useNavigate()
    interface Plan {
        id: string;
        name: string;
        duration: number; // Duración en días
        admissions: number;
        freePass: number;
    }
    
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await usersGet();
                setUsers(users); // Guardamos los objetos completos
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
        }
        fetchUsers();
        const fetchPlans = async () => {
            try {
                const plans = await getPlans();
                setPlans(plans);
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
        }
        fetchPlans();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    
        const userId = formData.get("users") as string;
        const planId = formData.get("plans") as string;
    
        // Busca el plan seleccionado
        const selectedPlan = plans.find((plan: any) => plan.id === planId);
    
        if (!selectedPlan) {
            console.error("Plan no encontrado");
            return;
        }
    
        // Calcula la fecha de fin de suscripción
        const currentDate = new Date();
        const subscriptionEnd = new Date(
            currentDate.setDate(currentDate.getDate() + (selectedPlan.duration || 0))
        ).toISOString(); // Formato de fecha en ISO
    
        const data = {
            userId: userId,
            admissions: selectedPlan.admissions || 0,
            freePass: selectedPlan.freePass || 0,
            subscriptionEnd,
        };

        try {
            await updateSubscription(data);
            alert("Suscripción asignada correctamente");
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
    };
    


    return(
        <div className="container-principal">
            <div onClick={() => setIsOpen(!isOpen)} className="horizontal-between cursor-pointer">
            <h1>Asignar Suscripciones</h1>
            <p className="text-2xl">{isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}</p>
            </div>
            {isOpen && 
            <div className="bg-white rounded-4xl p-4 mt-4 w-full space-y-4">
                <form onSubmit={handleSubmit} action="" className="space-y-2">
                    <div className="horizontal-between">
                        <label htmlFor="users">Usuario</label>
                        <select name="users" id="users" className="w-1/2 border px-2 py-2 rounded-3xl">
                            {users.map((user: any) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="horizontal-between">
                        <label htmlFor="plans">Planes</label>
                        <select name="plans" id="plans" className="w-1/2 border px-2 py-2 rounded-3xl">
                            {plans.map((plan: any) => (
                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="vertical-center">
                        <button type="submit" className="border px-4 py-2 rounded-3xl bg-green-600 text-white mt-4 transition-transform transform active:scale-95">Asignar</button>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}


