import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { login } from "../Redux/userSlice";
import { useDispatch } from "react-redux";
import { setGymInfo } from "../Redux/gymSlice";

export const SignIn: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { gymSlug }: any = useParams();
    
    
    const authApi = "http://localhost:3001/auth";
    const gymApi = "http://localhost:3003/gyms";
    
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
        sessionStorage.setItem('slug', gymSlug)
        try{
            const response = await axios.post(`${authApi}/login`, {
                email: userData.email,
                password: userData.password
            })
            const responseData = response.data
            const user = {
                token: responseData.token,
                role: responseData.role,
                name: responseData.name,
                email: responseData.email,
            }
            dispatch(login(user))
            if(sessionStorage.getItem('slug') === 'auth'){
                navigate('/');
            } else {
                const gym = await axios.get(`${gymApi}/${gymSlug}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${responseData.token}`
                        }
                    }
                )
                if(gym){
                    dispatch(setGymInfo(gym.data))
                    navigate(`/${gymSlug}/home`);
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
                <input onChange={handleInput} name="email" className="rounded-2xl outline-none border-none py-1 px-2" type="text" placeholder="Email"/>
                <input onChange={handleInput} name="password" className="rounded-2xl outline-none border-none py-1 px-2" type="password" placeholder="Contraseña"/>
                <button className="button-primary">Ingresar</button>
            </form>
        </div>
    )
}