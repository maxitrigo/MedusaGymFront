import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/userSlice";

export const Register: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

    const URL = "http://localhost:3001/auth";
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        surname: "",
        password: ""
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
        try {
            const response = await axios.post(`${URL}/register`, {
                email: userData.email,
                name: `${userData.name} ${userData.surname}`,
                password: userData.password
            });
            const responseData = response.data
            const user = {
                token: responseData.token,
                role: 'user',
                name: userData.name,
                email: userData.email
            }
            if(localStorage.getItem('slug')=== null) {
                navigate('/');
            }
            dispatch(login(user))
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <input onChange={handleInput} name="email" className=" rounded-2xl outline-none border-none py-1 px-2" type="text" placeholder="Email" />
        <input onChange={handleInput} name="name" className=" rounded-2xl outline-none border-none py-1 px-2" type="text" placeholder="Nombre" />
        <input onChange={handleInput} name="surname" className=" rounded-2xl outline-none border-none py-1 px-2" type="text" placeholder="Apellido" />
        <input onChange={handleInput} name="password" className=" rounded-2xl outline-none border-none py-1 px-2" type="password" placeholder="Contraseña" />
        <button className="button-primary">Registrarse</button>
      </form>
    </div>
  );
};
