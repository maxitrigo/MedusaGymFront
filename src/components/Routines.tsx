import { useEffect, useState } from "react";
import { deleteWorkout, getUserWorkouts } from "../helpers/DataRequests";
import { WorkoutContainer } from "./WorkoutContainer";

export const Routines = () => {
    const [routines, setRoutines] = useState<any[]>([]);

    useEffect(() => {
        const storedRoutines = sessionStorage.getItem("userRoutines");

        if (storedRoutines) {
            setRoutines(JSON.parse(storedRoutines));
        } else {
            const loadRoutines = async () => {
                try {
                    const response = await getUserWorkouts();
                    setRoutines(response);
                    sessionStorage.setItem("userRoutines", JSON.stringify(response));
                } catch (error) {
                    console.error("Error al cargar las rutinas:", error);
                }
            };
            loadRoutines();
        }
    }, []);

    const handleDelete = async (id: string) => {
        const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar esta rutina semanal?");
        if (isConfirmed) {
            try {
                await deleteWorkout(id);
                sessionStorage.removeItem("userRoutines");
                window.location.reload();
            } catch (error) {
                console.error("Error al eliminar la rutina:", error);
            }
        }
    };

    return (
        <div className="">
            { routines.length !== 0 ? 
            <h1 className="text-2xl font-black italic text-zinc-900 mt-4 mb-4 vertical-center bg-[#e8ff21] py-3 p-4 rounded-2xl w-full">
                Rutinas Semanales
            </h1>
            :
            ''
            }
            {routines.map((routine: any, index) => (
                <div key={routine.id}>
                <h2 className="text-lg font-black italic text-[#e8ff21] mt-4 pr-4 horizontal-end">Rutina {index + 1}</h2>
                {routine.dailyPlans.map((day: any, dayIndex: number) => (
                    <div key={`${routine.id}-${dayIndex}`}>
                            <h3 className="text-md font-bold italic text-[#e8ff21] mb-4 pr-4 horizontal-end">
                                Día {dayIndex + 1}
                            </h3>
                            <div className="rounded-3xl overflow-hidden mb-4">
                                <WorkoutContainer WorkoutsArray={day.dailyPlan} />
                            </div>
                        </div>
                    ))}
                    {/* Botón para eliminar esta rutina semanal */}
                    <div className="vertical-center mt-4">
                    <button
                    onClick={() => handleDelete(routine.id)}
                    className="button-delete"
                    >
                    Eliminar Rutina {index + 1}
                    </button>
                    </div>
                    </div>
                ))}
                </div>
            );
};
