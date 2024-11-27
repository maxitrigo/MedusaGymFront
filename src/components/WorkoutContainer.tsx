import { useState } from "react";
import { BiStopwatch } from "react-icons/bi";
import Countdown from "react-countdown"; // Importa el componente Countdown
import { GoVerified } from "react-icons/go";

type Workout = {
    name: string;
    variation?: string | null;
    sets: number;
    reps?: number;
    rest?: number; // El tiempo de descanso, en segundos (en string o número)
    setDuration?: string;
};

export const WorkoutContainer = ({
    WorkoutsArray,
}: {
    WorkoutsArray: Workout[];
}) => {
    const [workouts, setWorkouts] = useState(
        WorkoutsArray.map((workout) => ({
            ...workout,
            remainingSets: workout.sets, // Agrega un campo para sets restantes
            isResting: false, // Estado para saber si ya estamos en tiempo de descanso
        }))
    );

    // Función para calcular la fecha de fin del countdown
    const handleDate = (rest: number) => {
        return Date.now() + rest * 1000; // Multiplica por 1000 para convertir segundos a milisegundos
    };

    // Función para manejar cuando se hace clic en el set
    const handleSetClick = (index: number) => {
        setWorkouts((prevWorkouts) =>
            prevWorkouts.map((workout, i) =>
                i === index
                    ? {
                        ...workout,
                        remainingSets:
                            workout.remainingSets > 0 ? workout.remainingSets - 1 : 0,
                        isResting: workout.remainingSets === 1, // Si llegamos a 0 sets, comenzamos el descanso
                    }
                    : workout
            )
        );
    };

    return (
        <div className="overflow-x-auto w-full">
            <table className="table-auto overflow-hidden border-collapse w-full">
                <thead>
                    <tr className="bg-zinc-800 text-zinc-200">
                        <th className="py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                            EJERCICIO
                        </th>
                        <th className="px-2 py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                            Series
                        </th>
                        <th className="px-2 py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                            {WorkoutsArray.some((workout) => workout.reps !== undefined)
                                ? "Reps"
                                : "Duración"}
                        </th>
                        <th className="px-6 py-4 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                            {WorkoutsArray.some((workout) => workout.rest !== undefined)
                                ? "Descanso"
                                : ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800"}
                        >
                            <td className="px-6 py-4 md:px-6 md:py-4 text-zinc-200 font-black italic">
                                {workout.name}
                                {workout.variation && ` (${workout.variation})`}
                            </td>
                            <td
                                onClick={() => handleSetClick(index)}
                                className="py-2 md:py-4 text-zinc-200 text-center font-black italic cursor-pointer hover:text-yellow-300"
                            >
                                {workout.remainingSets === 0 ? (
                                    <p className="text-green-500 horizontal-center text-2xl">
                                        <GoVerified />
                                    </p>
                                ) : (
                                    `${workout.remainingSets} / ${workout.sets}`
                                )}
                            </td>
                            <td className="py-2 md:py-4 text-zinc-200 text-center font-black italic">
                                {workout.reps !== undefined
                                    ? workout.reps
                                    : workout.setDuration}
                            </td>
                            <td className="py-4 md:py-4 text-zinc-200 text-center font-black italic">
                                {workout.rest && workout.remainingSets === 0 ? (
                                    // Cuando los sets llegan a 0, mostramos el countdown
                                    <Countdown
                                        date={handleDate(Number(workout.rest))} // Pasa el tiempo de descanso en milisegundos
                                        overtime
                                        renderer={({ minutes, seconds, completed }) => {
                                            if (completed) {
                                                return (
                                                    <p className="text-green-500 horizontal-center text-2xl">
                                                        <GoVerified />
                                                    </p>
                                                );
                                            }
                                            // Muestra minutos y segundos
                                            return (
                                                <div className="horizontal-center">
                                                    <BiStopwatch className="mr-1 md:mr-2 text-yellow-300 text-lg md:text-2xl" />
                                                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds} min
                                                </div>
                                            );
                                        }}
                                    />
                                ) : (
                                    workout.rest && (
                                        <div className="horizontal-center">
                                            <BiStopwatch className="mr-1 md:mr-2 text-yellow-300 text-lg md:text-2xl" />{" "}
                                            {`${Math.floor(workout.rest / 60)}:${String(
                                                workout.rest % 60
                                            ).padStart(2, "0")} min`}
                                        </div>
                                    )
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
