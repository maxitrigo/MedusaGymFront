import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../../components/NavBar";
import { logout } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChangePassword } from "../../components/ChangePassword";
import { deleteGym, deleteUser, deleteUserGym } from "../../helpers/DataRequests";
import { MPaccessToken } from "../../components/MPaccesToken";

export default function Profile() {
    const [isOpenPass, setIsOpenPass] = useState<boolean>(false);
    const [isOpenMP, setIsOpenMP] = useState<boolean>(false);
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [isSubscriptionValid, setIsSubscriptionValid] = useState<boolean>(true);
    const dispatch = useDispatch();
    const email = sessionStorage.getItem("email") as string;
    const name = sessionStorage.getItem("name") as string;
    const navigate = useNavigate();
    const role = useSelector((state: any) => state.user.role);
    const slug = sessionStorage.getItem('slug');
    const subscriptionAdmin = useSelector((state: any) => state.gym.subscriptionEnd);
    const subscriptionUser = useSelector((state: any) => state.gymUser.subscriptionEnd);

    useEffect(() => {
        const subscriptionDate = role === 'admin' ? subscriptionAdmin : subscriptionUser;
        
        if (subscriptionDate) {
            const date = new Date(subscriptionDate);
            const currentDate = new Date();
            const formatted = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
            setFormattedDate(formatted);
            setIsSubscriptionValid(date > currentDate); // Válido si la fecha es futura
        } else {
            setFormattedDate('');
            setIsSubscriptionValid(false); // No válida si es null
        }
    }, [role, subscriptionAdmin, subscriptionUser]);

    const handleClick = () => {
        dispatch(logout());
        navigate(`/${slug}`);
    };

    const handlePasswordChange = async () => {
        setIsOpenPass(!isOpenPass);
    };

    const handleMP = async () => {
        setIsOpenMP(!isOpenMP);
    };

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

    const handleDeleteUserGym = async () => {
        const userInput = window.prompt(
            "Para desasociarse, escriba 'eliminar' y confirme la acción:"
        );

        if (userInput && userInput.toLowerCase() === "eliminar") {
            const isConfirmed = window.confirm("¿Está seguro de que desea desasociarse?");
            if (isConfirmed) {
                const userId = '';
                const response = await deleteUserGym(userId);
                if (response) {
                    alert("Para asociarte a otra academia ingresa en su link y logueate nuevamente!");
                    dispatch(logout());
                }
            }
        }
    };

    const handleMembership = () => {
        if (role === 'admin') {
            return navigate(`/${slug}/gymPlans`);
        }
        navigate(`/${slug}/Plans`);
    };

    return (
        <div className="mb-20">
            <NavBar />

            <div className="vertical-center space-y-4 p-2">
                <div className="vertical-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-48 h-48 rounded-full sm:mt-12" />
                </div>
                <div>
                    <div className="vertical-center mt-4">
                        <p className="text-white font-bold">{name}</p>
                        <p className="text-white">{email}</p>
                    </div>
                    <div
                        className={`text-center m-auto px-4 py-3 font-black italic text-xl rounded-3xl clickable mt-2 ${
                            isSubscriptionValid ? "bg-[#e8ff21] text-zinc-900" : "bg-red-500 text-white"
                        }`}
                        onClick={handleMembership}
                    >
                        {isSubscriptionValid
                            ? `Tu membresía vence el ${formattedDate}`
                            : "Tu membresía ha caducado."}
                    </div>
                </div>
                <div className="vertical-center">
                    <button onClick={handlePasswordChange} className="button-primary clickable">Cambiar Contraseña</button>
                    {isOpenPass && <ChangePassword />}
                </div>
                {role === 'admin' && 
                <div className="vertical-center">
                    <button onClick={handleMP} className="w-[200px] px-2 py-2 rounded-4xl clickable bg-[#4287F5] text-zinc-200 font-bold">Asociar Mercado Pago</button>
                    {isOpenMP && <MPaccessToken />}
                </div>
                }
                <div className="vertical-center">
                    <button className="button-primary clickable" onClick={handleClick}>Cerrar Sesión</button>
                </div>
                <div className="vertical-center">
                    {role === 'admin'
                        ? <button className="button-primary clickable" onClick={handleDeleteGym}>Eliminar Gym</button>
                        : <button className="button-primary clickable" onClick={handleDeleteUser}>Eliminar Usuario</button>}
                </div>
                <div className="vertical-center">
                    {role === 'user' && <button className="button-primary clickable" onClick={handleDeleteUserGym}>Desasociarse</button>}
                </div>
            </div>
        </div>
    );
}
