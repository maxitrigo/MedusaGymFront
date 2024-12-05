import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../../components/NavBar";
import { logout } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChangePassword } from "../../components/ChangePassword";
import { deleteGym, deleteUser } from "../../helpers/DataRequests";

export default function Profile() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const email = sessionStorage.getItem("email") as string
    const name = sessionStorage.getItem("name") as string
    const navigate = useNavigate()
    const role = useSelector((state: any) => state.user.role);
    

    const handleClick = () => {
        const slug = sessionStorage.getItem('slug')
        dispatch(logout())
        navigate(`/${slug}`);
    }
    const handlePasswordChange = async () => {
        setIsOpen(!isOpen)
    }
    
    const handleDeleteGym = async () => {
        const userInput = window.prompt(
            "Para eliminar la academia y el usuario, escriba 'eliminar' y confirme la acción:"
        );
    
        if (userInput && userInput.toLowerCase() === "eliminar") {
            const isConfirmed = window.confirm("¿Está seguro de que desea eliminar la Academia?");
            if (isConfirmed) {
                const response = await deleteGym();
                if (response) {
                    dispatch(logout());
                }
            }
        }
    };

    const handleDeleteUser = async () => {
        const userInput = window.prompt(
            "Para eliminar su usuario, escriba 'eliminar' y confirme la acción:"
        );
    
        if (userInput && userInput.toLowerCase() === "eliminar") {
            const isConfirmed = window.confirm("¿Está seguro de que desea eliminar su usuario?");
            if (isConfirmed) {
                const response = await deleteUser();
                if (response) {
                    dispatch(logout());
                }
            }
        }
    };

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
                <div className="vertical-center">
                {role === 'admin'?<button className="button-primary clickable" onClick={handleDeleteGym}>Eliminar Gym</button> : <button className="button-primary clickable" onClick={handleDeleteUser}>Eliminar Usuario</button>}
                </div>
            </div>
        </div>
    );
}