import { useState } from "react";
import { SignIn } from "../../components/SignIn";
import { Register } from "../../components/Register";

export default function Auth() {
    const [showRegister, setShowRegister] = useState(false);
    const [buttonText, setButtonText] = useState("or Register");

    const handleOnClick = () => {
        setShowRegister(!showRegister);
        setButtonText(showRegister ? "o Registrarse" : "o Ingresar");
    };

    return (
        <div>
            {showRegister ? <Register/> : <SignIn/>}
            <button className="button-third" onClick={handleOnClick}>{buttonText}</button>
        </div>
    );
}