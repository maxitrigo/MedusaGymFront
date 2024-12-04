import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../helpers/DataRequests";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    const slug = localStorage.getItem('slug')

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        setToken(tokenFromUrl);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            if(!token) {
                throw new Error("Falta token de reseteo.")
            }
            const response = await resetPassword(token, password)

            if (!response) {
                throw new Error("Error al restablecer la contraseña.");
            }
            setToken(null)
            localStorage.clear()
            navigate(`/${slug}`)
        } catch (error) {
        }
    };

    return (
        <div className="vertical-center w-full h-screen">
            <h1 className="text-zinc-200 text-2xl font-black italic mb-6">Restablecer Contraseña</h1>
            {token ? (
                <form className="vertical-center w-full space-y-4" onSubmit={handleSubmit}>
                    <div className="vertical-center space-y-2">
                        <label className="text-zinc-200 font-bold" htmlFor="password">Nueva Contraseña</label>
                        <input
                            className="px-4 py-2 rounded-3xl outline-none"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="vertical-center space-y-2">
                        <label className="text-zinc-200 font-bold" htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            className="px-4 py-2 rounded-3xl outline-none"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="button-send" type="submit">Restablecer</button>
                </form>
            ) : (
                <p>Token inválido o ausente.</p>
            )}
            {message && <p className="">{message}</p>}
        </div>
    );
};

export default ResetPassword;
