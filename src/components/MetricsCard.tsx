import { MdOutlineUpdate } from "react-icons/md";

export const MetricsCard = ({ text, title, icon }: any) => {
    const updatedAt = new Date();
    return (
        <div className="w-full h-full aspect-w-16 aspect-h-9 bg-zinc-900 rounded-4xl pb-4 px-4 flex flex-col justify-between hover:bg-zinc-800 transition-all duration-300">
            {/* Header con el ícono y título */}
            <div className="px-2 py-4 flex items-center">
                <div className="text-3xl text-[#e8ff21] mr-4 p-3 bg-background rounded-full flex-shrink-0">
                    {icon}
                </div>
                <p className="font-bold text-zinc-200">{title}</p>
            </div>

            {/* Contenido principal */}
            <div className="px-4 pb-2 text-zinc-200 flex flex-col items-end">
                <p className="italic text-2xl md:text-3xl text-zinc-200 mb-2">{text}</p>
                <div className="flex items-center text-xs sm:text-sm md:text-base text-zinc-400">
                    <p className="mr-2"><MdOutlineUpdate /></p>
                    <p className="italic text-sm">{updatedAt.toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

