import { AdminDashboard } from "../../components/AdminDashboards";
import { NavBar } from "../../components/NavBar";
import { UserDashboard } from "../../components/UserDashboard";

export default function DashBoard() {
    return (
        <div>
            <NavBar/>
            <UserDashboard />
            <AdminDashboard />
        </div>
    )
}