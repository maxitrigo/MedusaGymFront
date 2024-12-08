import { useEffect, useState } from "react";
import { getUserById } from "../helpers/DataRequests";
import { useDispatch } from "react-redux";
import { setGymUser } from "../Redux/gymUserSlice";

interface StreakDay {
  date: string;
  completed: boolean;
}

const WorkoutStreak = () => {
  const [streak, setStreak] = useState<StreakDay[]>([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserData = async () => {
      // Verificar si ya hay datos del usuario en sessionStorage
      const storedUser = sessionStorage.getItem("userData");

      let user;
      if (storedUser) {
        user = JSON.parse(storedUser);
      } else {
        user = await getUserById();
        dispatch(setGymUser(user))
        sessionStorage.setItem("userData", JSON.stringify(user)); // Guardar datos del usuario en sessionStorage
      }

      const completedDates = user.trainingDates
        ? user.trainingDates.map((date: string) => ({ date, completed: true }))
        : [];

      // Evitar el error al acceder directamente a user.trainingDates sin verificar si es null
      const days = user.trainingDates
        ? user.trainingDates.map((date: string) => parseInt(date.split("-")[2]))
        : [];

      // No usamos reverse directamente sobre 'days', sino que lo hacemos en una copia.
      const daysReversed = [...days].reverse();

      let count = 1; // Inicia la cuenta en 1
      for (let i = 1; i < daysReversed.length; i++) {
        if (daysReversed[i] === daysReversed[i - 1] - 1) {
          // Si es consecutivo (verifica si el día actual es el anterior menos 1)
          count++;
        } else if (daysReversed[i] < daysReversed[i - 1]) {
          // Si el número es menor pero no consecutivo
          break;
        }
      }
      sessionStorage.setItem("streak", count.toString());

      const currentYear = new Date().getFullYear();
      const fullYearStreak: StreakDay[] = [];

      // Generar todos los días del año
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(currentYear, month + 1, 0).getDate(); // Número de días en el mes

        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = `${currentYear}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const isCompleted = completedDates.some(
            (completedDate: any) => completedDate.date === dateStr
          );

          fullYearStreak.push({ date: dateStr, completed: isCompleted });
        }
      }

      setStreak(fullYearStreak);
    };

    fetchUserData();
  }, []); // Solo se ejecuta una vez al montar el componente

  const getColor = (completed: boolean): string => {
    return completed ? "bg-[#e8ff21]" : "bg-background";
  };

  // Agrupar los días en semanas de 7 días
  const weeks = [];
  for (let i = 0; i < streak.length; i += 7) {
    weeks.push(streak.slice(i, i + 7));
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-16 text-zinc-700 font-semibold italic">
        <div>Ene</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Abr</div>
        <div>May</div>
        <div>Jun</div>
        <div>Jul</div>
        <div>Ago</div>
        <div>Set</div>
        <div>Oct</div>
        <div>Nov</div>
        <div>Dic</div>
      </div>
      <div className="flex space-x-1 mb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col space-y-1">
            {week.map((streakDay) => (
              <div
                key={streakDay.date}
                className={`w-4 h-4 rounded-full ${getColor(streakDay.completed)}`}
                title={streakDay.date}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutStreak;
