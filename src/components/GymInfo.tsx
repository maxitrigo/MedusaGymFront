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
        <div className="bg-white rounded-4xl w-full px-6 p-6">
            <div>
                <h2 className="text-2xl font-bold mb-4">Información del gimnasio</h2>
            </div>
            {gymInfo.map((info, index) => (
                <div key={index} className="flex justify-between">
                    <p className="font-bold">{info.label}:</p>
                    <p className="font-bold">{info.value}</p>
                </div>
            ))}
        </div>
    );
};
