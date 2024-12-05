import { useState } from "react";
import { SignIn } from "../../components/SignIn";
import { Register } from "../../components/Register";
import { PasswordReset } from "../../components/PasswordReset";

export default function Auth() {
    const [currentView, setCurrentView] = useState<"signIn" | "register" | "passwordReset">("signIn");

    const toggleRegister = () => {
        setCurrentView(currentView === "register" ? "signIn" : "register");
    };

    const showPasswordReset = () => {
        setCurrentView("passwordReset");
    };

    const goToSignIn = () => {
        setCurrentView("signIn");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="mb-4 horizontal-center">
                <p className="text-[#e4ff00] text-6xl font-black italic">GYM</p>
                <p className="text-zinc-200 text-6xl font-bold italic">metrics</p>
            </div>
            {currentView === "signIn" && <SignIn />}
            {currentView === "register" && <Register />}
            {currentView === "passwordReset" && <PasswordReset />}
            
            {currentView !== "passwordReset" && (
                <button className="button-third" onClick={toggleRegister}>
                    {currentView === "register" ? "o Ingresar" : "o Registrarse"}
                </button>
            )}
            {currentView === "passwordReset" ? (
                <button className="text-white mt-4" onClick={goToSignIn}>Volver a Ingresar</button>
            ) : (
                <button className="text-white" onClick={showPasswordReset}>Olvidó su contraseña?</button>
            )}
        </div>
    );
}
