import { NavBar } from "../../components/NavBar"
import { IoInfiniteSharp } from "react-icons/io5";
import { MdAutoGraph } from "react-icons/md";
import WorkoutStreak  from "../../components/WorkOutStreak";
import Announcements from "../../components/Announcement";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GymContactWhatsapp } from "../../components/GymContactWhatsapp";
import { GymContactEmail } from "../../components/GymContactEmail";
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { CgMathPlus } from "react-icons/cg";
import { getUserById } from "../../helpers/DataRequests";
import { setGymUser } from "../../Redux/gymUserSlice";

export default function GymPage() {
    useSessionTimeout(); // Inicia el control de sesión
    const name = useSelector((state: any) => state.user.name);
    const gymName = useSelector((state: any) => state.gym.name);
    const openHours = useSelector((state: any) => state.gym.openHours);
    const closeHours = useSelector((state: any) => state.gym.closeHours);
    const gymSlug = useSelector((state: any) => state.gym.slug);

    // Accediendo a los valores directamente desde el estado global de gymUser
    const freePass = useSelector((state: any) => state.gymUser.freePass);
    const passes = useSelector((state: any) => state.gymUser.passes);
    const streak = useSelector((state: any) => state.gymUser.streak);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = sessionStorage.getItem("userData");
            let user;
            if (storedUser) {
                user = JSON.parse(storedUser);
            } else {
                user = await getUserById();
                dispatch(setGymUser(user));
                sessionStorage.setItem("userData", JSON.stringify(user)); // Guardar en sessionStorage
            }
        };

        fetchUserData();
    }, [dispatch]); // Solo se ejecuta una vez al montar el componente

    const isInfinate = freePass;
    const remainingAccesses = passes;

    const handleAccess = () => {
        setTimeout(() => {
            navigate(`/${gymSlug}/plans`);
        }, 300);
    };

    function isOpen(open: string, close: string): boolean {
        if (!open || !close) {
            return false;
        }

        const now = new Date();
        const minutesNow = now.getHours() * 60 + now.getMinutes();
        const [openTime, openmin] = open.split(":").map(Number);
        const [closeTime, closemin] = close.split(":").map(Number);

        const minutesToOpen = openTime * 60 + openmin;
        const minutesToClose = closeTime * 60 + closemin;

        return minutesNow >= minutesToOpen && minutesNow < minutesToClose;
    }

    return (
        <div className="flex flex-col justify-center items-center h-full p-2 overflow-y-auto pb-28 max-w-[768px] m-auto">
            <NavBar />
            <div className="w-full justify-start bg-zinc-900 pt-8 px-6 py-4 rounded-4xl">
                <p className="text-white text-lg font-nunito">Hola 👋</p>
                <p className="text-white text-4xl font-nunito italic">{name}</p>
                <p className="text-white text-lg font-nunito">¡Vamos con todo, hoy es otro día para romperla! 🙌💪</p>
            </div>

            <div className={isOpen(openHours, closeHours) ? "open" : "closed"}>
                <p>{isOpen(openHours, closeHours) ? `${gymName} está Abierto` : "Cerrado"}</p>
            </div>

            <div className="w-full bg-zinc-900 pt-4 px-6 py-6 rounded-4xl mt-2">
                <p className="text-zinc-700 text-xl font-nunito text-center font-black italic">Entrenamientos Completados</p>
                <WorkoutStreak />
            </div>

            <div className="w-full place-items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2 p-2">
                <div className="w-40 h-40 bg-principal rounded-4xl clickable relative ">
                    <div onClick={handleAccess}>
                        <div className="flex justify-between m-2">
                            <div className="horizontal-center px-2">
                                <p className="font-nunito font-bold text-zinc-200">Accesos</p>
                            </div>
                            <div className="flex flex-col items-center justify-center ">
                                <p className="text-xl p-2 bg-background rounded-full text-zinc-200 "><CgMathPlus /></p>
                            </div>
                        </div>
                        <div className="text-zinc-200 text-7xl font-nunito horizontal-center">
                            {isInfinate ? (
                                <IoInfiniteSharp />
                            ) : (
                                <span className="text-zinc-200 pt-2 text-6xl font-bold">{remainingAccesses}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-40 h-40 bg-principal rounded-4xl">
                    <div className="flex justify-between m-2">
                        <div className="flex flex-col items-center justify-center ">
                            <p className="font-nunito font-bold text-zinc-200 pl-4">Racha</p>
                        </div>
                        <div>
                            <p className="text-xl text-zinc-200 bg-background rounded-full p-2"><MdAutoGraph /></p>
                        </div>
                    </div>
                    <div>
                        <p className="text-zinc-200 text-6xl font-bold text-center pt-2">{streak}</p>
                    </div>
                </div>

                <GymContactWhatsapp />
                <GymContactEmail />
            </div>

            <div className="w-full">
                <Announcements />
            </div>
        </div>
    );
}
