import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useSelector } from "react-redux";

export const GymContactInfo = () => {
    const gym = useSelector((state: any) => state.gym);

    const handleWhatsappClick = () => {
        const whatsappUrl = `https://wa.me/+598${gym.phone}`;
        window.open(whatsappUrl, "_blank");
    };

    const handleEmailClick = () => {
        const emailUrl = `mailto:${gym.email}`;
        window.open(emailUrl, "_blank");
    };

    return (
        <div className="vertical-center text-neutral-300">
            <h2 className="text-2xl font-bold mb-4">Contactanos</h2>
            <div className="horizontal-around w-full">
            <div onClick={handleWhatsappClick} className="border border-neutral-300 rounded-4xl h-24 w-24 vertical-center clickable">
                <p className="text-6xl mb-2"><FaWhatsapp /></p>
            </div>
            <div onClick={handleEmailClick} className="border border-neutral-300 rounded-4xl h-24 w-24 vertical-center clickable">
                <p className="text-6xl"><MdOutlineEmail /></p>
            </div>
            </div>
        </div>
    );
};