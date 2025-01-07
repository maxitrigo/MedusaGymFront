import { useSelector } from "react-redux";
import ReserveComponent from "../../components/ReservationWindow";
import ResourcesComponent from "../../components/Resources";
import MyReservations from "../../components/myReservations";
import { NavBar } from "../../components/NavBar";

export default function Reservations () {
    const role = useSelector((state: any) => state.user.role);
    
    return (
        <div className="pb-24">
            <NavBar/>
            {role === 'admin' && 
            <ResourcesComponent/>
            }
            <ReserveComponent/>
            {role === 'user' && 
            <div>
                <p className="text-zinc-200 text-center text-xl font-bold">Mis Reservas</p>
                <MyReservations/>
            </div>
            }
        </div>
    )
}