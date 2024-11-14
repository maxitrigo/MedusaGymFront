import { Communications } from "./Communications"
import { CreatedPlans } from "./CreatedPlans"
import { CreatePlan } from "./CreatePlan"
import { EditGymInfo } from "./EditGymInfo"
import { GymInfo } from "./GymInfo"
import { ShowUsers } from "./ShowUsers"

export const AdminDashboard = () => {
    return (
        <>
            <GymInfo/>
            <EditGymInfo/>
            <Communications/>
            <ShowUsers/>
            <CreatePlan/>
            <CreatedPlans/>
        </>
    )
}