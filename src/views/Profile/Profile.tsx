import { useDispatch } from "react-redux";
import { NavBar } from "../../components/NavBar";
import { logout } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChangePassword } from "../../components/ChangePassword";

export default function Profile() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const email = sessionStorage.getItem("email") as string
    const name = sessionStorage.getItem("name") as string
    const navigate = useNavigate()
    

    const handleClick = () => {
        const slug = sessionStorage.getItem('slug')
        dispatch(logout())
        navigate(`/${slug}`);
    }
    const handlePasswordChange = async () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="horizontal-center h-screen">
            <NavBar />

            <div className="space-y-4 h-screen">
                <div className="vertical-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-48 h-48 rounded-full mt-12" />
                </div>
                <div>
                <div className="vertical-center mt-4">
                    <p className="text-white font-bold">{name}</p>
                    <p className="text-white">{email}</p>
                </div>

                </div>
                <div className="vertical-center">
                    <button onClick={handlePasswordChange} className="button-primary clickable">Cambiar Contraseña</button>
                    {isOpen && <ChangePassword/>}
                </div>
                <div className="vertical-center">
                <button className="button-primary clickable" onClick={handleClick}>Cerrar Sesion</button>
                </div>
            </div>
        </div>
    );
}