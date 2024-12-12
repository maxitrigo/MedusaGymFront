import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../Redux/userSlice";
import { setGymInfo } from "../Redux/gymSlice";
import { addUserToGym, checkLogin, getGymInfo, userRegister } from "../helpers/DataRequests";
import { GoEye, GoEyeClosed } from "react-icons/go";

export const Register: React.FC = () => {
    const { gymSlug }: any = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Verificar que todos los campos estén llenos
        const allFieldsFilled = Object.values(userData).every((value) => value.trim() !== "");
        if (!allFieldsFilled) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Verificar que las contraseñas coincidan
        if (userData.password !== userData.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        sessionStorage.setItem('slug', gymSlug);
        try {
            const response = await userRegister(userData);

            const responseData = response.data;
            const user = {
                token: responseData.token,
                role: 'user',
                name: userData.name,
                email: userData.email,
            };
            dispatch(login(user));

            const currentSlug = sessionStorage.getItem('slug');
            if (currentSlug === 'auth' || currentSlug === 'undefined') {
                navigate('/');
                return;
            }

            // Intentar recuperar información del gimnasio
            let gymInfo = await getGymInfo();
            if (!gymInfo) {
                sessionStorage.setItem('slug', 'default');
                gymInfo = await getGymInfo();
            }

            if (gymInfo) {
                const addUser = await addUserToGym(gymInfo.gymToken);
                if (addUser) {
                    dispatch(setGymInfo(gymInfo));
                    const response = await checkLogin();
                    if (response) {
                        return navigate(`/${gymSlug === 'default' ? 'default' : gymSlug}/home`);
                    }
                }
            }

            alert('Error al agregar el usuario al gimnasio.');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                <input 
                    onChange={handleInput} 
                    name="email" 
                    className="rounded-2xl outline-none border-none py-1 px-4" 
                    type="text" 
                    placeholder="Email" 
                />
                <input 
                    onChange={handleInput} 
                    name="name" 
                    className="rounded-2xl outline-none border-none py-1 px-4" 
                    type="text" 
                    placeholder="Nombre" 
                />
                <input 
                    onChange={handleInput} 
                    name="surname" 
                    className="rounded-2xl outline-none border-none py-1 px-4" 
                    type="text" 
                    placeholder="Apellido" 
                />
                <div className="relative w-full">
                    <input 
                        onChange={handleInput} 
                        name="password" 
                        className="rounded-2xl outline-none border-none py-1 px-4 w-full" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Contraseña" 
                    />
                    <span 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? <GoEyeClosed className="text-zinc-400" /> : <GoEye className="text-zinc-400" />}
                    </span>
                </div>
                <div className="relative w-full">
                    <input 
                        onChange={handleInput} 
                        name="confirmPassword" 
                        className="rounded-2xl outline-none border-none py-1 px-4 w-full" 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirmar contraseña" 
                    />
                    <span 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showConfirmPassword ? <GoEyeClosed className="text-zinc-400" /> : <GoEye className="text-zinc-400" />}
                    </span>
                </div>
                <button className="button-primary">Registrarse</button>
            </form>
        </div>
    );
};
