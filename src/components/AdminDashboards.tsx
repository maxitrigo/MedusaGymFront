import { Communications } from "./Communications"
import { CreatedPlans } from "./CreatedPlans"
import { CreatePlan } from "./CreatePlan"
import { DailyRegister } from "./DailyRegister"
import { EditGymInfo } from "./EditGymInfo"
// import { GymPerformance } from "./GymPerformance"
import { ManualPlanAsignation } from "./ManualPlanAsignation"
import { ShowUsers } from "./ShowUsers"

export const AdminDashboard = () => {
    return (
        <>
            <EditGymInfo/>
            <Communications/>
            <ShowUsers/>
            <CreatePlan/>
            <CreatedPlans/>
            <ManualPlanAsignation/>
            <DailyRegister/>
        </>
    )
}