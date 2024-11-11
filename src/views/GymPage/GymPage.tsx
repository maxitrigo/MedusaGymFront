import { NavBar } from "../../components/NavBar"
import { IoInfiniteSharp } from "react-icons/io5";
import { MdAutoGraph } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { PiPaperPlaneTilt } from "react-icons/pi";
import WorkoutStreak  from "../../components/WorkOutStreak";
import MonthlyComparisonChart from "../../components/MonthlyComparisonChart";
import Announcements from "../../components/Announcement";

export default function GymPage() {
    const name = sessionStorage.getItem("name")
    const gymName = sessionStorage.getItem("gymName")
    const openHours = JSON.parse(sessionStorage.getItem("openHours") as string)
    const closeHours = JSON.parse(sessionStorage.getItem("closeHours") as string)

    function isOpen(open: string, close: string): boolean {
        const now = new Date();
        const minutesNow = now.getHours() * 60 + now.getMinutes();
      
        const [openTime, openmin] = open.split(":").map(Number);
        const [closeTime, closemin] = close.split(":").map(Number);
      
        const minutesToOpen = openTime * 60 + openmin;
        const minutesToClose = closeTime * 60 + closemin;
      
        return minutesNow >= minutesToOpen && minutesNow < minutesToClose;
      }

      const isInfinate = true
      const remainingAccesses = 12

      const streak = Array.from({ length: 365 }, (_, index) => {
        const date = new Date(2024, 0, 1); // 1 de enero de 2024
        date.setDate(date.getDate() + index); // Incrementa el día
      
        // Simulación de si el entrenamiento fue completado (aleatorio en este caso)
        const completed = Math.random() > 0.3; // 70% de probabilidad de haber entrenado
      
        return {
          date: date.toISOString().split('T')[0], // Formato "YYYY-MM-DD"
          completed: completed,
        };
      });

    return (
        <div className="flex flex-col items-center h-full w-screen p-2 overflow-y-auto pb-24">
            <NavBar/>
            <div className="w-full justify-start bg-white pt-8 px-6 py-4 rounded-4xl">
                <div>
                <p className="text-black text-2xl font-nunito">Hola 👋</p>
                </div>
                <div>
                <p className="text-black text-2xl font-nunito italic font-bold">{name}</p>
                </div>
                <div>
                <p className="text-black text-2xl font-nunito">¡Vamos con todo, hoy es otro día para romperla! 🙌💪</p>
                </div>
            </div>

            <div className={isOpen(openHours, closeHours) ? "open" : "closed"}>
                <p className="">{isOpen(openHours, closeHours) ? `${gymName} esta Abierto` : "Cerrado"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2 sm:grid-cols-3">
                <div className="w-40 h-40 bg-principal rounded-4xl">
                    <div className="flex justify-between bg-background rounded-4xl m-2">
                        <div className="flex flex-col items-center justify-center ">
                            <p className="font-nunito font-bold text-white pl-2 ">Accesos</p>
                        </div>
                        <div className="p-2">
                            <p className="text-xl bg-white rounded-full px-1 py-1"><IoTicketSharp /></p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-8xl font-nunito flex items-center justify-center">{isInfinate ? <IoInfiniteSharp /> : remainingAccesses}</p>
                    </div>
                </div>
                <div className="w-40 h-40 bg-principal rounded-4xl">
                <div className="flex justify-between bg-background rounded-4xl m-2">
                        <div className="flex flex-col items-center justify-center ">
                            <p className="font-nunito font-bold text-white pl-2 ">Racha</p>
                        </div>
                        <div className="p-2">
                            <p className="text-xl bg-white rounded-full px-1 py-1"><MdAutoGraph /></p>
                        </div>
                    </div>
                    <div className="">
                        <p className="text-7xl font-nunito font-bold text-center">1</p>
                    </div>
                    <div className="flex justify-between">
                        <div></div>
                        <div className="text-2xl bg-white rounded-full px-2 py-2"><PiPaperPlaneTilt /></div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-neutral-700 pt-4 px-6 py-6 rounded-4xl mt-6 ">
                <p className="text-white text-xl font-nunito text-center font-bold">Entrenamientos Completados</p>
                <WorkoutStreak streak={streak} />
            </div>
            
            <div>
                <Announcements />
            </div>

        </div>
    )
}