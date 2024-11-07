import axios from "axios";
import { useState } from "react";

export const SignIn: React.FC = () => {
    
    const URL = "http://localhost:3001/auth";
    
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
        console.log(userData);
        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            console.log(userData);
            const response = await axios.post(`${URL}/login`, {
                email: userData.email,
                password: userData.password
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                <input onChange={handleInput} name="email" className="text-white rounded-2xl outline-none border-none py-1 px-2" type="text" placeholder="Email"/>
                <input onChange={handleInput} name="password" className="text-white rounded-2xl outline-none border-none py-1 px-2" type="password" placeholder="Contraseña"/>
                <button className="button-primary">Ingresar</button>
            </form>
        </div>
    )
}