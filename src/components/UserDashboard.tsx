import { useEffect, useState } from "react"
import FitnessForm from "./FitnessForm"
import LevelContainer from "./LevelContainer"
import { Workouts } from "./Workouts";
import { Routines } from "./Routines";

export const UserDashboard = () => {
    const [points, setPoints] = useState(0);

    useEffect(() => {
        setPoints(Number(sessionStorage.getItem("points")));
    },[])

    return (
        <>
            <LevelContainer points={points}/>
            <FitnessForm/>
            <div className="text-center w-full py-2 text-zinc-900 rounded-2xl mt-6 text-2xl font-black italic text-zinc-200 bg-[#e8ff21]">
                <h3>Crea tu Rutina</h3>
            </div>
            <Workouts/>
            <Routines/>
        </>
    )
}