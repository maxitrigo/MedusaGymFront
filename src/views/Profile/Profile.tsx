import { useDispatch } from "react-redux";
import { NavBar } from "../../components/NavBar";
import { logout } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch()
    const email = sessionStorage.getItem("email") as string
    const name = sessionStorage.getItem("name") as string
    const navigate = useNavigate()
    

    const handleClick = () => {
        const slug = sessionStorage.getItem('slug')
        dispatch(logout())
        navigate(`/${slug}`);
    }

    return (
        <>
            <NavBar />

            <div className="flex flex-col items-center h-screen">
            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-48 h-48 rounded-full mt-12" />
            </div>
            <div>
            <div className="flex flex-col items-center mt-4">
                <p className="text-white font-bold">{name}</p>
                <p className="text-white">{email}</p>
            </div>

            </div>
            <div className="w-3/4 h-12 mt-4 rounded-3xl bg-green-600 text-white flex items-center justify-center font-bold">
                <p className="">Suscripcion Activa</p>
            </div>
            <div>
                <button className="w-60 h-12 mt-4 rounded-3xl bg-sky-700 mb-4 font-bold text-white transition-transform transform active:scale-95">Cambiar Contraseña</button>
            </div>
            <button className="button-primary transition-transform transform active:scale-95" onClick={handleClick}>Cerrar Sesion</button>
            </div>
        </>
    );
}