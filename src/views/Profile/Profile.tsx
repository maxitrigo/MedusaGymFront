import { useDispatch } from "react-redux";
import { NavBar } from "../../components/NavBar";
import { logout } from "../../Redux/userSlice";

export default function Profile() {
    const dispatch = useDispatch()
    const email = localStorage.getItem("email")
    const name = localStorage.getItem("name")
    console.log(email, name);
    

    const handleClick = () => {
        dispatch(logout())
    }

    return (
        <div>
            <NavBar />
            <div>
                <p>{email}</p>
                <p>{name}</p>
                <p></p>
                <p></p>
            </div>
            <div className="flex flex-col items-center h-screen">
            <button className="button-primary" onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
}