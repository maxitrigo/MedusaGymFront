import { useState } from "react";
import { updateGym, userLogin } from "../helpers/DataRequests";
import { useSelector } from "react-redux";

export const MPaccessToken = () => {
    const [userData, setUserData] = useState({});
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Para manejar errores de validación
    const email = useSelector((state: any) => state.user.email);

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(''); // Limpiar errores previos

        if (!password) {
            setError('La contraseña es obligatoria');
            return;
        }

        const user = {
            email,
            password,
        };

        try {
            const login = await userLogin(user);
            if (!login) {
                setError('Contraseña inválida');
                return;
            }
            await updateGym(userData);
            alert('Access Token Guardado con exito')
            window.location.reload()
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setError('Contraseña inválida');
            } else {
                setError('Error al guardar los datos');
            }
            console.error('Error al guardar:', err);
        }
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSave} className="vertical-center space-y-4">
                <p className="text-zinc-200 pl-4 pr-4 text-center">¡El token de mercado pago es informacion sensible, una vez que lo guardes no lo veras mas en pantalla!</p>
                <textarea
                    name="mercadoPago"
                    onChange={handleInput}
                    rows={2}
                    className="rounded-3xl px-3 py-2 outline-none  w-full"
                    placeholder="Mercado Pago Access Token"
                />
                <input
                    name="password"
                    type="password"
                    onChange={handlePassword}
                    className="rounded-3xl px-3 py-2 outline-none"
                    placeholder="Contraseña"
                />
                {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error */}
                <button className="button-send" type="submit">
                    Guardar
                </button>
            </form>
        </div>
    );
};
