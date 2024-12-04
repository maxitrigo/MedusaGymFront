import { useSelector } from "react-redux";
import CreateGym from "../CreateGym/CreateGym";
import { useNavigate } from "react-router-dom";
import useSessionTimeout from "../../hooks/useSessionTimeout";

export default function Home() {
    useSessionTimeout()// aca comienza el inicio de sesion
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/auth');
    }

    return (
        <div className="vertical-center m-4">
            {isLoggedIn ? 
            <div>
                <CreateGym /> 
            </div>
            : 
            <button onClick={handleClick} className="button-primary">Crea Tu Gym</button>}
        </div>
    );
}