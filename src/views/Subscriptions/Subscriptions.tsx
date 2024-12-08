import { useEffect } from "react";
import { NavBar } from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Subscriptions() {
    const navigate = useNavigate()
    const slug = useSelector((state: any) => state.gym.slug);

    useEffect(() => {
        setTimeout(() => {
            navigate(`/${slug}/home`)
        },4000)
    })

    return (
        <div className="horizontal-center h-screen">
            <NavBar />

            <div className="vertical-center space-y-4 h-screen w-full">
                <div className="w-1/4 ">
                    <img 
                        src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/2764-1f525.svg" 
                        alt="Corazon en llamas" 
                        className="heart-animation"
                    />
                </div>
                <div className="font-black text-zinc-200 italic text-2xl">
                    <p>Gracias por suscribirte!</p>
                </div>
            </div>
        </div>
    );
}
