import { NavBar } from "../../components/NavBar"
import { IoInfiniteSharp } from "react-icons/io5";
import { MdAutoGraph } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import WorkoutStreak  from "../../components/WorkOutStreak";
import Announcements from "../../components/Announcement";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GymContactWhatsapp } from "../../components/GymContactWhatsapp";
import { GymContactEmail } from "../../components/GymContactEmail";
import { Shop } from "../../components/Shop";


export default function GymPage() {
    const name = useSelector((state: any) => state.user.name);
    const gymName = useSelector((state: any) => state.gym.name);
    const openHours = useSelector((state: any) => state.gym.openHours);
    const closeHours = useSelector((state: any) => state.gym.closeHours);
    const gymSlug = useSelector((state: any) => state.gym.slug);

    const navigate = useNavigate();

    const [states, setStates] = useState<{ freePass: boolean; passes: number | null | undefined, streak: number }>({
        freePass: false,
        passes: null,
        streak: 0
    });

    useEffect(() => {
        const parseItem = (key: string, defaultValue: any) => {
            const item = sessionStorage.getItem(key);
            try {
                return item ? JSON.parse(item) : defaultValue;
            } catch {
                return defaultValue;
            }
        };
    
        const freePass = parseItem("freePass", false);
        const passes = parseItem("admissions", 0);
        const streak = parseItem("streak", 0);
    
        setStates({ freePass, passes, streak });
    }, []);


    const { freePass, passes } = states

    function isOpen(open: string, close: string): boolean {
        const now = new Date();
        const minutesNow = now.getHours() * 60 + now.getMinutes();
      
        const [openTime, openmin] = open.split(":").map(Number);
        const [closeTime, closemin] = close.split(":").map(Number);
      
        const minutesToOpen = openTime * 60 + openmin;
        const minutesToClose = closeTime * 60 + closemin;
      
        return minutesNow >= minutesToOpen && minutesNow < minutesToClose;
      }

      const remainingAccesses = passes
      const isInfinate = freePass

      const handleAcsess = () => {
        setTimeout(() => {
            navigate(`/${gymSlug}/plans`);
        }, 300)
      }

    return (
        <div className="flex flex-col justify-center items-center h-full p-2 overflow-y-auto pb-28">
            <NavBar/>
            <div className="w-full justify-start bg-zinc-900 pt-8 px-6 py-4 rounded-4xl">
                <div>
                <p className="text-white text-2xl font-nunito">Hola 👋</p>
                </div>
                <div>
                <p className="text-white text-2xl font-nunito italic font-black">{name}</p>
                </div>
                <div>
                <p className="text-white text-2xl font-nunito ">¡Vamos con todo, hoy es otro día para romperla! 🙌💪</p>
                </div>
            </div>

            <div className={isOpen(openHours, closeHours) ? "open" : "closed"}>
                <p className="">{isOpen(openHours, closeHours) ? `${gymName} esta Abierto` : "Cerrado"}</p>
            </div>

            <div className="w-full bg-zinc-900  pt-4 px-6 py-6 rounded-4xl mt-2 ">
                <p className="text-zinc-700 text-xl font-nunito text-center font-black italic">Entrenamientos Completados</p>
                <WorkoutStreak />
            </div>

            <div className="w-full place-items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2 p-2">
                <div onClick={handleAcsess} className="w-40 h-40 bg-principal rounded-4xl clickable">
                    <div className="flex justify-between bg-background rounded-4xl m-2">
                        <div className="flex flex-col items-center justify-center ">
                            <p className="font-nunito font-black italic text-zinc-200 pl-4 ">Accesos</p>
                        </div>
                        <div className="p-2">
                            <p className="text-xl text-zinc-200 rounded-full px-1 py-1"><IoTicketSharp /></p>
                        </div>
                    </div>
                    <div className="">
                    <p className="text-zinc-900 text-8xl font-nunito flex items-center justify-center">
                        {isInfinate ? (
                            <IoInfiniteSharp />
                        ) : (
                            <span className="text-zinc-900 text-7xl font-bold pt-2">{remainingAccesses}</span>
                        )}
                        </p>
                    </div>
                </div>
                <div className="w-40 h-40 bg-principal rounded-4xl">
                <div className="flex justify-between bg-background rounded-4xl m-2">
                        <div className="flex flex-col items-center justify-center ">
                            <p className="font-nunito font-black italic text-zinc-200 pl-4 ">Racha</p>
                        </div>
                        <div className="p-2">
                            <p className="text-xl text-zinc-200 rounded-full px-1 py-1"><MdAutoGraph /></p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-zinc-900 text-7xl font-bold text-center pt-2">{states.streak}</p>
                    </div>
                </div>
                <GymContactWhatsapp/>
                <GymContactEmail/>
            </div>
            <div className="w-full">
                <Announcements />
            </div>
            <div className="grid grid-cols-2 gap-4 place-items-center p-2 sm:grid-cols-2">
            <div className="">
                <Shop/>
            </div>
            </div>


        </div>
    )
}