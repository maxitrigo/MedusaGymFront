import { useEffect, useState } from "react"
import FitnessForm from "./FitnessForm"
import LevelContainer from "./LevelContainer"

export const UserDashboard = () => {
    const [points, setPoints] = useState(0);

    useEffect(() => {
        setPoints(Number(sessionStorage.getItem("points")));
    },[])

    return (
        <>
            <LevelContainer points={points}/>
            <FitnessForm/>
        </>
    )
}