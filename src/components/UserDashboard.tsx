import FitnessForm from "./FitnessForm"
import LevelContainer from "./LevelContainer"

export const UserDashboard = () => {
    const points = JSON.parse(sessionStorage.getItem('points') as string)
    
    return (
        <>
            <LevelContainer points={points}/>
            <FitnessForm/>
        </>
    )
}