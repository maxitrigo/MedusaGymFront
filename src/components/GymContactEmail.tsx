import { MdOutlineEmail } from "react-icons/md";
import { useSelector } from "react-redux";

export const GymContactEmail = () => {
    const gym = useSelector((state: any) => state.gym);

    const handleEmailClick = () => {
        const emailUrl = `mailto:${gym.email}`;
        window.open(emailUrl, "_blank");
    };

    return (
        <div className="vertical-center">
            <div onClick={handleEmailClick} className="w-40 h-40 bg-principal rounded-4xl clickable">
                    <div className="flex justify-between bg-background rounded-4xl m-2">
                        <div className="flex flex-col items-center justify-center ">
                            <p className="font-nunito font-black italic text-zinc-200 pl-4 ">Contacto</p>
                        </div>
                        <div className="p-2">
                            <p className="text-xl text-zinc-200 rounded-full px-1 py-1"><MdOutlineEmail /></p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-7xl text-zinc-900 font-nunito flex items-center justify-center pt-2"><MdOutlineEmail /></p>
                    </div>
            </div>
        </div>
    );
};