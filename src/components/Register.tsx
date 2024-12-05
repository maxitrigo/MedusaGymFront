
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../Redux/userSlice";
import { setGymInfo } from "../Redux/gymSlice";
import { addUserToGym, getGymInfo, userRegister } from "../helpers/DataRequests";

export const Register: React.FC = () => {
  const{ gymSlug }: any = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
  
      // Verificar que todos los campos estén llenos
      const allFieldsFilled = Object.values(userData).every((value) => value.trim() !== "");
      if (!allFieldsFilled) {
          alert("Por favor, completa todos los campos."); // O manejar con un estado para mostrar un mensaje en el formulario
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
          if (
              sessionStorage.getItem('slug') === 'auth' ||
              sessionStorage.getItem('slug') === 'undefined'
          ) {
              navigate('/');
          } else {
              const gymInfo = await getGymInfo();
              const addUser = await addUserToGym(gymInfo.gymToken);
  
              if (addUser) {
                  dispatch(setGymInfo(gymInfo));
                  navigate(`/${gymSlug}/home`);
              }
          }
      } catch (error) {
          console.log(error);
      }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <input onChange={handleInput} name="email" className=" rounded-2xl outline-none border-none py-1 px-4" type="text" placeholder="Email" />
        <input onChange={handleInput} name="name" className=" rounded-2xl outline-none border-none py-1 px-4" type="text" placeholder="Nombre" />
        <input onChange={handleInput} name="surname" className=" rounded-2xl outline-none border-none py-1 px-4" type="text" placeholder="Apellido" />
        <input onChange={handleInput} name="password" className=" rounded-2xl outline-none border-none py-1 px-4" type="password" placeholder="Contraseña" />
        <button className="button-primary">Registrarse</button>
      </form>
    </div>
  );
};
