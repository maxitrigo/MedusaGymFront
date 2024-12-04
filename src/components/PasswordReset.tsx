import { useState } from "react"
import { requestPasswordReset } from "../helpers/DataRequests"
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";

export const PasswordReset = () => {
    const [userData, setUserData] = useState({
        email: '',
    })
    const [sendButton, setSendButton] = useState(
        <button className="button-send outline-none">Enviar</button>
    )
    const { gymSlug }: any = useParams();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        localStorage.setItem('slug', gymSlug)
        try {
            const response = await requestPasswordReset(userData)
            setSendButton(
                <Countdown
                    date={Date.now() + 45000} // 30 segundos hacia atrás
                    overtime
                    renderer={({ seconds }) => {
                        return (
                            <div className="vertical-center text-zinc-300 font-bold">
                                <p>Espera {seconds < 10 ? `0${seconds}` : seconds} segundos</p>
                                <p>Para poder solicitar nuevamente el link</p>
                            </div>
                        );
                    }}
                />
            );
            setTimeout(()=> {
                setSendButton(<button className="button-send outline-none">Enviar</button>)
            },45000)
            return response
        } catch (error) {
            alert('No existe email de recuperacion!')
        }
    }

    return (
        <div>
            <form className="vertical-center space-y-4" onSubmit={handleSubmit} action="">
                <p className="text-zinc-200 font-bold italic text-center">Ingrese su Correo, y le enviaremos un link <br/> para restablecer su contraseña</p>
                <input className="px-4 py-2 rounded-3xl outline-none" name="email" type="text" placeholder="Email" onChange={handleInput} />
                {sendButton}
            </form>
        </div>
    )
}