import { Communications } from "./Communications"
import { CreatedPlans } from "./CreatedPlans"
import { CreatePlan } from "./CreatePlan"
import { DailyRegister } from "./DailyRegister"
import { EditGymInfo } from "./EditGymInfo"
import { GymInfo } from "./GymInfo"
// import { GymPerformance } from "./GymPerformance"
import { ManualPlanAsignation } from "./ManualPlanAsignation"
import { ShowUsers } from "./ShowUsers"

export const AdminDashboard = () => {
    return (
        <>
            {/* <GymInfo/> */}
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