import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { login, logout } from "../Redux/userSlice";
import { useDispatch } from "react-redux";
import { setGymInfo } from "../Redux/gymSlice";
import { checkLogin, checkOwnership, getGymInfo, getUserById, userLogin } from "../helpers/DataRequests";
import { setGymUser } from "../Redux/gymUserSlice";

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
        const storedSlug =sessionStorage.setItem('slug', gymSlug)
        try{
            if(storedSlug !== null) {
                const loginInfo = await userLogin(userData)
                const responseData = loginInfo
                const user = {
                    token: responseData.token,
                    role: responseData.role,
                    name: responseData.name,
                    email: responseData.email,
                }
                await dispatch(login(user))
                if(user.role === 'admin' && (sessionStorage.getItem('slug') !== 'auth' && sessionStorage.getItem('slug') !== 'undefined')) {
                    const gymInfo = await getGymInfo()
                    await dispatch(setGymInfo(gymInfo))
                    const response = await checkOwnership()
                    if(!response) {
                        dispatch(logout())
                        alert('No tienes permiso para ingresar en esta academia')
                    }
                    return navigate(`/${gymSlug}/home`);
                }
            } else {
                alert("Por favor selecciona una academia")
            }
            if(sessionStorage.getItem('slug') === 'auth' || sessionStorage.getItem('slug') === 'undefined'){
                navigate('/');
            } else {
                const gymInfo = await getGymInfo()
                await getUserById().then((user) => {
                    dispatch(setGymUser(user))
                })
                if(gymInfo){
                    await dispatch(setGymInfo(gymInfo))
                    const response = await checkLogin()
                    if(!response) {
                        dispatch(logout())
                        alert('No tienes permiso para ingresar a esta academia, para registrarte en ella primero des asocia tu academia actual desde tu perfil, y luego ingresa a tu nueva academia!')
                    }
                    navigate(`/${gymSlug}/home`);
                } else {
                    sessionStorage.setItem('slug', 'default')
                    const gymInfo = await getGymInfo()
                    await dispatch(setGymInfo(gymInfo))
                    const response = await checkLogin();
                    if (response) {
                        navigate(`/default/home`);
                    } else {
                        dispatch(logout());
                        alert('No se pudo iniciar sesión en el gimnasio predeterminado.');
                    }
                }
            }
            
        } catch (error) {
            alert("Email o contraseña incorrectos");
            console.log(error);
        }
    }

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