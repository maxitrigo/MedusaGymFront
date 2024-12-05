import { FaWhatsapp } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useSelector } from "react-redux";

export const GymContactWhatsapp = () => {
    const gym = useSelector((state: any) => state.gym);

    const handleWhatsappClick = () => {
        const whatsappUrl = `https://wa.me/+598${gym.phone}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="vertical-center">
            <div onClick={handleWhatsappClick} className="w-40 h-40 bg-principal rounded-4xl clickable ">
                    <div className="flex justify-between m-2">
                        <div className="flex flex-col items-center justify-center ">
                            <p className="font-nunito text-lg font-bold text-zinc-200 pl-2">Contacto</p>
                        </div>
                        <div className="">
                            <p className="text-xl bg-background rounded-full p-2 text-zinc-200"><FiArrowUpRight /></p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-7xl text-zinc-200 font-nunito flex items-center justify-center"><FaWhatsapp /></p>
                    </div>
            </div>
        </div>
    );
};