import { AdminDashboard } from "../../components/AdminDashboards";
import { NavBar } from "../../components/NavBar";
import { UserDashboard } from "../../components/UserDashboard";

export default function DashBoard() {
    return (
        <div className="flex flex-col items-center h-full w-screen p-2 overflow-y-auto pb-24">
            <NavBar/>
            <UserDashboard />
            <AdminDashboard />
        </div>
    )
}