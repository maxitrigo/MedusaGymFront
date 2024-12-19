import { useState } from "react";
import { BiSolidVideos, BiStopwatch } from "react-icons/bi";
import Countdown from "react-countdown";
import { GoVerified } from "react-icons/go";

type Workout = {
    name: string;
    variation?: string | null;
    video: string;
    sets: number;
    reps?: number;
    rest?: number;
    setDuration?: string;
};

type WorkoutState = Workout & {
    remainingSets: number;
    isResting: boolean;
    restEndTime: number | null;
};

export const WorkoutContainer = ({
    WorkoutsArray,
}: {
    WorkoutsArray: Workout[];
}) => {
    const [workouts, setWorkouts] = useState<WorkoutState[]>(
        WorkoutsArray.map((workout) => {
            return {
                ...workout,
                remainingSets: workout.sets,
                isResting: false,
                restEndTime: null,
            };
        })
    );

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<string | null>(null);

    const handleSetClick = (index: number) => {
        setWorkouts((prevWorkouts) =>
            prevWorkouts.map((workout, i) =>
                i === index
                    ? {
                          ...workout,
                          remainingSets: Math.max(workout.remainingSets - 1, 0),
                          isResting: workout.remainingSets === 1,
                          restEndTime:
                              workout.remainingSets === 1 && workout.rest
                                  ? Date.now() + workout.rest * 1000
                                  : workout.restEndTime,
                      }
                    : workout
            )
        );
    };

    const handleVideo = (video: string) => {
        setCurrentVideo(video);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setCurrentVideo(null);
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className="overflow-x-auto w-full">
                <table className="table-auto overflow-hidden border-collapse w-full">
                    <thead>
                        <tr className="bg-[#e8ff21] text-zinc-900">
                            <th className="py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                                EJERCICIO
                            </th>
                            <th></th>
                            <th className="px-1 py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                                Series
                            </th>
                            <th className="px-1 py-2 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                                {WorkoutsArray.some(
                                    (workout) => workout.reps !== undefined
                                )
                                    ? "Reps"
                                    : "Duración"}
                            </th>
                            <th className="px-4 py-4 md:px-4 md:py-4 text-center md:text-xl font-black italic">
                                {WorkoutsArray.some(
                                    (workout) => workout.rest !== undefined
                                )
                                    ? "Descanso"
                                    : ""}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((workout, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800"
                                }
                            >
                                <td className="px-2 py-2 md:px-6 md:py-4 text-zinc-200 font-black italic">
                                    {workout.name}
                                    {workout.variation &&
                                        ` (${workout.variation})`}
                                </td>
                                <td className="px-2 py-2 md:px-6 md:py-4 text-zinc-200 font-black italic">
                                    <BiSolidVideos
                                        className="cursor-pointer hover:text-[#e8ff21]"
                                        onClick={() => handleVideo(workout.video)}
                                    />
                                </td>
                                <td
                                    onClick={() => handleSetClick(index)}
                                    className="py-2 md:py-4 text-zinc-200 text-center font-black italic cursor-pointer hover:text-[#e8ff21]"
                                >
                                    {workout.remainingSets === 0 ? (
                                        <p className="text-[#e8ff21] horizontal-center text-2xl">
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
                                    {workout.rest && workout.restEndTime ? (
                                        <Countdown
                                            date={workout.restEndTime}
                                            overtime
                                            renderer={({
                                                minutes,
                                                seconds,
                                                completed,
                                            }) => {
                                                if (completed) {
                                                    return (
                                                        <p className="text-green-500 horizontal-center text-2xl">
                                                            <GoVerified />
                                                        </p>
                                                    );
                                                }
                                                return (
                                                    <div className="horizontal-center">
                                                        <BiStopwatch className="mr-1 md:mr-2 text-[#e8ff21] text-lg md:text-2xl" />
                                                        {minutes}:
                                                        {seconds < 10
                                                            ? `0${seconds}`
                                                            : seconds}{" "}
                                                        min
                                                    </div>
                                                );
                                            }}
                                        />
                                    ) : (
                                        workout.rest && (
                                            <div className="horizontal-center">
                                                <BiStopwatch className="mr-1 md:mr-2 text-[#e8ff21] text-lg md:text-2xl" />{" "}
                                                {`${Math.floor(
                                                    workout.rest / 60
                                                )}:${String(
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

            {/* Modal */}
            {isPopupOpen && currentVideo && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-zinc-900 p-4 rounded-lg relative">
                        <button
                            className="absolute top-2 right-2 text-white text-xl"
                            onClick={closePopup}
                        >
                            ✖
                        </button>
                        <img
                            src={currentVideo} // Carga el GIF
                            alt="Workout GIF"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
};
