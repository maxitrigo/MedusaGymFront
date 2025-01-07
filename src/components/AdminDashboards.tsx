import { MdKeyboardArrowRight } from "react-icons/md"
import { Communications } from "./Communications"
import { CreatedPlans } from "./CreatedPlans"
import { CreatePlan } from "./CreatePlan"
import { DailyRegister } from "./DailyRegister"
import { EditGymInfo } from "./EditGymInfo"
// import { GymPerformance } from "./GymPerformance"
import { ManualPlanAsignation } from "./ManualPlanAsignation"

import { ShowUsers } from "./ShowUsers"
import { useNavigate, useParams } from "react-router-dom"

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const slug = sessionStorage.getItem('slug');
    const handleClick = () => {
        navigate(`/${slug}/reservations`);
    }
    return (
        <>
            <EditGymInfo/>
            <Communications/>
            <ShowUsers/>
            <CreatePlan/>
            <CreatedPlans/>
            <ManualPlanAsignation/>
            <DailyRegister/>
            <div className="container-principal">
            <div onClick={handleClick} className="horizontal-between cursor-pointer">
                <h1>Crear Clases</h1>
                <p className="text-2xl"><MdKeyboardArrowRight /></p>
            </div>
            </div>
        </>
    )
}