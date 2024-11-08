import { NavBar } from "../../components/NavBar"

export default function GymPage() {
    const name = localStorage.getItem("gymName")
    const address = localStorage.getItem("address")
    const phone = localStorage.getItem("phone")
    const openHours = localStorage.getItem("openHours")
    const closeHours = localStorage.getItem("closeHours")

    return (
        <div>
            <NavBar/>
            <div>
                <h1 className="text-white">{name}</h1>
                <p className="text-white">{address}</p>
            </div>
        </div>
    )
}