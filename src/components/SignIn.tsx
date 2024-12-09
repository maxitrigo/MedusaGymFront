import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { login, logout } from "../Redux/userSlice";
import { useDispatch } from "react-redux";
import { setGymInfo } from "../Redux/gymSlice";
import { checkLogin, checkOwnership, getGymInfo, userLogin } from "../helpers/DataRequests";

export const SignIn: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { gymSlug }: any = useParams();
    
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target

        setUserData({
            ...userData,
            [name]: value
        })
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sessionStorage.setItem('slug', gymSlug);
    
        try {
            const storedSlug = sessionStorage.getItem('slug');
    
            if (!storedSlug || storedSlug === 'auth' || storedSlug === 'undefined') {
                alert("Por favor selecciona una academia");
                navigate('/default');
                return;
            }
    
            const loginInfo = await userLogin(userData);
            const user = {
                token: loginInfo.token,
                role: loginInfo.role,
                name: loginInfo.name,
                email: loginInfo.email,
            };
    
            await dispatch(login(user));
    
            if (user.role === 'admin') {
                const gymInfo = await getGymInfo();
                await dispatch(setGymInfo(gymInfo));
    
                const response = await checkOwnership();
                if (!response) {
                    dispatch(logout());
                    alert('No tienes permiso para ingresar en esta academia');
                    return;
                }
                return navigate(`/${gymSlug}/home`);
            }
    
            const gymInfo = await getGymInfo();
            if (gymInfo) {
                await dispatch(setGymInfo(gymInfo));
                const response = await checkLogin();
                if (!response) {
                    dispatch(logout());
                    alert('No tienes permiso para ingresar a esta academia. Para registrarte en ella primero des asocia tu academia actual desde tu perfil, y luego ingresa a tu nueva academia!');
                    return;
                } else if ( response.slug === 'default' ) {
                    alert('Fuiste desvinculado de tu academia, si crees que este mensaje es un error comunicate con la misma!, mientras tanto podes iniciar sesion en la academia generica!')
                    sessionStorage.setItem('slug', 'default');
                    const defaultGymInfo = await getGymInfo();
                    await dispatch(setGymInfo(defaultGymInfo));
                    const response = await checkLogin();
                    if (response) {
                        return navigate(`/default/home`);
                    }
                }
                return navigate(`/${gymSlug}/home`);
            }
    
            sessionStorage.setItem('slug', 'default');
            const defaultGymInfo = await getGymInfo();
            await dispatch(setGymInfo(defaultGymInfo));
            const response = await checkLogin();
            if (response) {
                return navigate(`/default/home`);
            }
    
            dispatch(logout());
            alert('No se pudo iniciar sesión en el gimnasio predeterminado.');
    
        } catch (error) {
            alert("Email o contraseña incorrectos");
            console.log(error);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                <input onChange={handleInput} name="email" className="rounded-2xl outline-none border-none py-1 px-4" type="text" placeholder="Email"/>
                <input onChange={handleInput} name="password" className="rounded-2xl outline-none border-none py-1 px-4" type="password" placeholder="Contraseña"/>
                <button className="button-primary">Ingresar</button>
            </form>
        </div>
    )
}