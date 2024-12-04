import { useState } from "react"
import { changePassword } from "../helpers/DataRequests"

export const ChangePassword = () => {
    const [userData, setUserData] = useState({
        currentPassword: '',
        newPassword: ''
    })

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUserData({
            ...userData,
            [name]: value
        })
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await changePassword(userData)
            alert('Contraseña modificada exitosamente!')
            return response
        } catch (error) {
            alert('No se pudo cambiar la contraseña!')
        }
    }

    return (
        <div className="mt-4 vertical-center">
            <form onSubmit={handleSubmit} className="vertical-center space-y-4" action="">
                <input onChange={handleInput} className="principal-input" type="password" name="currentPassword" placeholder="*******" />
                <input onChange={handleInput} className="principal-input" type="password" name="newPassword" placeholder="*******" />
                <button className="button-send">Enviar</button>
            </form>
        </div>
    )
}