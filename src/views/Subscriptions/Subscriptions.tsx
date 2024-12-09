import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/userSlice";

export default function Subscriptions() {
    const navigate = useNavigate()
    const slug = useSelector((state: any) => state.gym.slug);
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(logout())
            navigate(`/${slug}`)
        },4000)
    })

    return (
        <div className="horizontal-center h-screen">
            <div className="vertical-center space-y-4 h-screen w-full">
                <div className="w-1/4 ">
                    <img 
                        src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/2764-1f525.svg" 
                        alt="Corazon en llamas" 
                        className="heart-animation"
                    />
                </div>
                <div className="vertical-center text-center font-black text-zinc-200 italic text-2xl">
                    <p>¡Gracias por suscribirte!</p>
                    <p className="text-lg">¡Ingresa nuevamente, para ver tu suscripcion actualizada!</p>
                </div>
            </div>
        </div>
    );
}
