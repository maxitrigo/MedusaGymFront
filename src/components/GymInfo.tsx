import { FiInfo } from "react-icons/fi";
import { useSelector } from "react-redux";

export const GymInfo = () => {
    const gym = useSelector((state: any) => state.gym);

    const gymInfo = [
        { label: "Nombre", value: gym.name },
        { label: "Dirección", value: gym.address },
        { label: "Teléfono", value: gym.phone },
        { label: "Correo", value: gym.email },
        { label: "Horario Apertura", value: gym.openHours },
        { label: "Horario de Cierre", value: gym.closeHours },
    ];

    return (
        <div className="container-principal">
            <div className="text-xl bg-background py-2 px-4 rounded-3xl horizontal-between">
                <h2>Información del gimnasio</h2>
                <p className="text-green-400">
                    <FiInfo />
                </p>
            </div>
            {gymInfo.map((info, index) => (
                <div key={index} className="flex justify-between bg-background px-6 py-2 rounded-2xl">
                    <p className="font-bold">{info.label}:</p>
                    <p className="font-normal">{info.value}</p>
                </div>
            ))}
        </div>
    );
};
